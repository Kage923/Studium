import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../firebaseClient'
import { COLLECTIONS } from './firestoreSchema'
import type { Deck, Flashcard } from '../types'
import { createId } from '../types'

export function decksCollection() {
  return collection(db, COLLECTIONS.DECKS)
}

export function deckRef(deckId: string) {
  return doc(db, COLLECTIONS.DECKS, deckId)
}

export async function getDecks(userId: string): Promise<Deck[]> {
  const q = query(
    decksCollection(),
    where('userId', '==', userId)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => {
    const data = d.data()
    return {
      id: d.id,
      name: data.name ?? 'Deck',
      cards: (data.cards ?? []) as Flashcard[],
    }
  })
}

export function subscribeDecks(
  userId: string,
  onDecks: (decks: Deck[]) => void
): Unsubscribe {
  const q = query(
    decksCollection(),
    where('userId', '==', userId)
  )
  return onSnapshot(
    q,
    (snap) => {
      const decks: Deck[] = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          name: data.name ?? 'Deck',
          cards: (data.cards ?? []) as Flashcard[],
        }
      })
      onDecks(decks)
    },
    () => onDecks([])
  )
}

export async function createDeck(userId: string, name: string): Promise<string> {
  const ref = await addDoc(decksCollection(), {
    userId,
    name,
    cards: [],
  })
  return ref.id
}

export async function addCardToDeck(
  deckId: string,
  front: string,
  back: string
): Promise<void> {
  const ref = deckRef(deckId)
  const snap = await getDoc(ref)
  const data = snap.data()
  const cards: Flashcard[] = (data?.cards ?? []) as Flashcard[]
  const newCard: Flashcard = { id: createId(), front, back }
  await updateDoc(ref, { cards: [...cards, newCard] })
}

export async function setDeckCards(deckId: string, cards: Flashcard[]): Promise<void> {
  const ref = deckRef(deckId)
  await updateDoc(ref, { cards })
}

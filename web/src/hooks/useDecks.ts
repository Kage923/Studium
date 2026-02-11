import { useEffect, useState } from 'react'
import {
  subscribeDecks,
  createDeck as createDeckFirestore,
  addCardToDeck as addCardToDeckFirestore,
} from '../lib/decksFirestore'
import type { Deck } from '../types'

export function useDecks(userId: string | null) {
  const [decks, setDecksState] = useState<Deck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setDecksState([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribeDecks(userId, (next) => {
      setDecksState(next)
      setLoading(false)
    })
    return () => {
      unsub()
    }
  }, [userId])

  const createDeck = async (name: string): Promise<string> => {
    if (!userId) return ''
    return createDeckFirestore(userId, name)
  }

  const addCard = async (
    deckId: string,
    front: string,
    back: string
  ): Promise<void> => {
    await addCardToDeckFirestore(deckId, front, back)
  }

  return { decks, loading, createDeck, addCard }
}

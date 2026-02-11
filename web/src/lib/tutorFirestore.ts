import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '../firebaseClient'
import { COLLECTIONS } from './firestoreSchema'
import type { ChatMessage } from '../types'

const DEFAULT_WELCOME: ChatMessage = {
  id: 'welcome',
  author: 'theodore',
  text: `Welcome back. Let's make this session focused and productive. What are you studying today, and what would you like to achieve by the end of this block?`,
  createdAt: new Date().toISOString(),
}

export function tutorSessionRef(userId: string) {
  return doc(db, COLLECTIONS.TUTOR_SESSIONS, userId)
}

export async function getTutorMessages(userId: string): Promise<ChatMessage[]> {
  const ref = tutorSessionRef(userId)
  const snap = await getDoc(ref)
  const data = snap.data()
  const messages = data?.messages
  if (Array.isArray(messages) && messages.length > 0) {
    return messages as ChatMessage[]
  }
  return [DEFAULT_WELCOME]
}

export async function setTutorMessages(
  userId: string,
  messages: ChatMessage[]
): Promise<void> {
  const ref = tutorSessionRef(userId)
  await setDoc(ref, { messages }, { merge: true })
}

export function subscribeTutorMessages(
  userId: string,
  onMessages: (messages: ChatMessage[]) => void
): Unsubscribe {
  const ref = tutorSessionRef(userId)
  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.data()
      const messages = data?.messages
      if (Array.isArray(messages) && messages.length > 0) {
        onMessages(messages as ChatMessage[])
      } else {
        onMessages([DEFAULT_WELCOME])
      }
    },
    () => onMessages([DEFAULT_WELCOME])
  )
}

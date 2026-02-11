import { useEffect, useState } from 'react'
import {
  subscribeTutorMessages,
  setTutorMessages as setTutorMessagesFirestore,
} from '../lib/tutorFirestore'
import type { ChatMessage } from '../types'

export function useTutorMessages(userId: string | null) {
  const [messages, setMessagesState] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setMessagesState([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribeTutorMessages(userId, (next) => {
      setMessagesState(next)
      setLoading(false)
    })
    return () => {
      unsub()
    }
  }, [userId])

  const setMessages = async (next: ChatMessage[]) => {
    if (!userId) return
    setMessagesState(next)
    await setTutorMessagesFirestore(userId, next)
  }

  return { messages, loading, setMessages }
}

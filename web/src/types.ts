export type TabKey = 'tutor' | 'plan' | 'flashcards' | 'profile'

export type MessageAuthor = 'theodore' | 'user'

export type ChatMessage = {
  id: string
  author: MessageAuthor
  text: string
  createdAt: string
}

export type PlanTaskStatus = 'pending' | 'in_progress' | 'done'

export type PlanTask = {
  id: string
  title: string
  dueLabel: string
  status: PlanTaskStatus
}

export type Flashcard = {
  id: string
  front: string
  back: string
}

export type Deck = {
  id: string
  name: string
  cards: Flashcard[]
}

export const createId = () => Math.random().toString(36).slice(2)


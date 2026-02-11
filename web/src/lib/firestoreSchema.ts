/**
 * Firestore data schemas (informal) – all scoped by userId.
 *
 * 1) Tutor sessions & messages
 *    Collection: tutorSessions
 *    Doc ID: userId
 *    Fields: { messages: Array<{ id, author: 'theodore'|'user', text, createdAt }> }
 *
 * 2) Daily plans / tasks
 *    Collection: plans
 *    Doc ID: `${userId}_${dateStr}`  e.g. "abc123_2026-02-06"
 *    Fields: { userId, date: dateStr, tasks: Array<{ id, title, dueLabel, status }> }
 *
 * 3) Decks & flashcards
 *    Collection: decks
 *    Doc ID: deckId (auto)
 *    Fields: { userId, name, cards: Array<{ id, front, back }> }
 */

export const COLLECTIONS = {
  TUTOR_SESSIONS: 'tutorSessions',
  PLANS: 'plans',
  DECKS: 'decks',
} as const

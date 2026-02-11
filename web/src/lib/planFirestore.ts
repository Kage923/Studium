import { doc, getDoc, setDoc, onSnapshot, type Unsubscribe } from 'firebase/firestore'
import { db } from '../firebaseClient'
import { COLLECTIONS } from './firestoreSchema'
import type { PlanTask } from '../types'

function planDocId(userId: string, dateStr: string) {
  return `${userId}_${dateStr}`
}

export function planRef(userId: string, dateStr: string) {
  return doc(db, COLLECTIONS.PLANS, planDocId(userId, dateStr))
}

export function todayDateStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getPlanTasks(
  userId: string,
  dateStr: string
): Promise<PlanTask[]> {
  const ref = planRef(userId, dateStr)
  const snap = await getDoc(ref)
  const data = snap.data()
  const tasks = data?.tasks
  if (Array.isArray(tasks)) return tasks as PlanTask[]
  return []
}

export async function setPlanTasks(
  userId: string,
  dateStr: string,
  tasks: PlanTask[]
): Promise<void> {
  const ref = planRef(userId, dateStr)
  await setDoc(ref, { userId, date: dateStr, tasks }, { merge: true })
}

export function subscribePlanTasks(
  userId: string,
  dateStr: string,
  onTasks: (tasks: PlanTask[]) => void
): Unsubscribe {
  const ref = planRef(userId, dateStr)
  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.data()
      const tasks = data?.tasks
      onTasks(Array.isArray(tasks) ? (tasks as PlanTask[]) : [])
    },
    () => onTasks([])
  )
}

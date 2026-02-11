import { useEffect, useState } from 'react'
import {
  subscribePlanTasks,
  setPlanTasks as setPlanTasksFirestore,
  todayDateStr,
} from '../lib/planFirestore'
import type { PlanTask } from '../types'

export function usePlanTasks(userId: string | null) {
  const [tasks, setTasksState] = useState<PlanTask[]>([])
  const [loading, setLoading] = useState(true)
  const dateStr = todayDateStr()

  useEffect(() => {
    if (!userId) {
      setTasksState([])
      setLoading(false)
      return
    }
    setLoading(true)
    const unsub = subscribePlanTasks(userId, dateStr, (next) => {
      setTasksState(next)
      setLoading(false)
    })
    return () => {
      unsub()
    }
  }, [userId, dateStr])

  const setTasks = async (next: PlanTask[]) => {
    if (!userId) return
    setTasksState(next)
    await setPlanTasksFirestore(userId, dateStr, next)
  }

  return { tasks, loading, setTasks }
}

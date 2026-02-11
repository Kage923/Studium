import { useMemo, useState } from 'react'
import './App.css'
import { createId, type ChatMessage, type PlanTask, type PlanTaskStatus, type TabKey } from './types'
import { TutorPage } from './pages/TutorPage'
import { PlanPage } from './pages/PlanPage'
import { FlashcardsPage } from './pages/FlashcardsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuth } from './auth/AuthContext'
import { AuthDialog } from './auth/AuthDialog'
import { WelcomePage } from './pages/WelcomePage'
import { useTutorMessages } from './hooks/useTutorMessages'
import { usePlanTasks } from './hooks/usePlanTasks'
import { useDecks } from './hooks/useDecks'

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'tutor', label: 'Tutor', icon: '🧠' },
  { key: 'plan', label: 'Plan', icon: '📅' },
  { key: 'flashcards', label: 'Cards', icon: '🎴' },
  { key: 'profile', label: 'Profile', icon: '👤' },
]

function App() {
  const { user } = useAuth()
  const userId = user?.uid ?? null
  const [activeTab, setActiveTab] = useState<TabKey>('tutor')
  const [authOpen, setAuthOpen] = useState(false)

  const { messages, setMessages } = useTutorMessages(userId)
  const { tasks, setTasks } = usePlanTasks(userId)
  const { decks, createDeck, addCard } = useDecks(userId)

  const handleNewTutorSession = () => {
    const next: ChatMessage[] = [
      {
        id: createId(),
        author: 'theodore',
        text: `New session started. Briefly tell me your goal for this study block, and I’ll help you structure it.`,
        createdAt: new Date().toISOString(),
      },
    ]
    setMessages(next)
  }

  const handleSendTutorMessage = (text: string) => {
    const now = new Date().toISOString()
    const userMessage: ChatMessage = {
      id: createId(),
      author: 'user',
      text,
      createdAt: now,
    }

    const responseText =
      `Got it. Here’s a simple next step: focus on one small chunk for the next 25 minutes, then check in with me.\n\n` +
      `To keep this practical, tell me:\n` +
      `• What specific topic are you on?\n` +
      `• When is your next exam or deadline related to it?\n\n` +
      `I’ll help you turn that into concrete flashcards or a short quiz.`

    const theoMessage: ChatMessage = {
      id: createId(),
      author: 'theodore',
      text: responseText,
      createdAt: now,
    }

    setMessages([...messages, userMessage, theoMessage])
  }

  const handleGenerateTodayPlan = () => {
    const base: PlanTask[] = [
      {
        id: createId(),
        title: '25‑minute focused study block',
        dueLabel: 'Start now · finish in 25 minutes',
        status: 'pending',
      },
      {
        id: createId(),
        title: 'Create 10 flashcards from today’s material',
        dueLabel: 'Within the next 45 minutes',
        status: 'pending',
      },
      {
        id: createId(),
        title: 'Quick 5‑question self‑quiz',
        dueLabel: 'Before you finish this session',
        status: 'pending',
      },
    ]
    setTasks(base)
  }

  const handleToggleTaskStatus = (id: string) => {
    const next = tasks.map((task): PlanTask => {
      if (task.id !== id) return task
      let status: PlanTaskStatus = 'pending'
      if (task.status === 'pending') status = 'in_progress'
      else if (task.status === 'in_progress') status = 'done'
      return { ...task, status }
    })
    setTasks(next)
  }

  const handleCreateDeck = async (name: string): Promise<string> => {
    return createDeck(name)
  }

  const handleAddCard = async (
    deckId: string,
    front: string,
    back: string
  ): Promise<void> => {
    await addCard(deckId, front, back)
  }

  const progress = useMemo(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((t) => t.status === 'done').length
    const totalCards = decks.reduce((sum, d) => sum + d.cards.length, 0)
    const totalMessages = messages.length
    return { completedTasks, totalTasks, totalCards, totalMessages }
  }, [tasks, decks, messages])

  const renderActivePage = () => {
    switch (activeTab) {
      case 'tutor':
        return (
          <TutorPage
            messages={messages}
            onNewSession={handleNewTutorSession}
            onSendMessage={handleSendTutorMessage}
          />
        )
      case 'plan':
        return (
          <PlanPage
            tasks={tasks}
            onGenerateToday={handleGenerateTodayPlan}
            onToggleStatus={handleToggleTaskStatus}
          />
        )
      case 'flashcards':
        return (
          <FlashcardsPage
            decks={decks}
            onCreateDeck={handleCreateDeck}
            onAddCard={handleAddCard}
          />
        )
      case 'profile':
        return (
          <ProfilePage
            completedTasks={progress.completedTasks}
            totalTasks={progress.totalTasks}
            totalCards={progress.totalCards}
            totalMessages={progress.totalMessages}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">
            <img src="/studium-brain.svg" alt="Studium logo" className="app-logo-img" />
          </div>
          <div className="app-title">
            <span className="app-title-main">Studium</span>
            <span className="app-title-tagline">Learn your way.</span>
          </div>
        </div>
        <div className="app-header-right">
          <div className="app-header-chip">MVP · Phase 1</div>
          <button type="button" onClick={() => setAuthOpen(true)}>
            {user
              ? (user.email ?? '')
                  .split('@')[0]
                  .slice(0, 18) || 'Account'
              : 'Sign in'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {user ? renderActivePage() : <WelcomePage onOpenAuth={() => setAuthOpen(true)} />}
      </main>

      {user && (
        <nav className="bottom-nav" aria-label="Studium main navigation">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab
            return (
              <button
                key={tab.key}
                type="button"
                className={`bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span aria-hidden="true">{tab.icon}</span>
                <div>{tab.label}</div>
              </button>
            )
          })}
        </nav>
      )}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default App

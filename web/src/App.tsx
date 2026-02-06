import { useState } from 'react'
import './App.css'

type TabKey = 'tutor' | 'plan' | 'flashcards' | 'profile'

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'tutor', label: 'Tutor', icon: '🧠' },
  { key: 'plan', label: 'Plan', icon: '📅' },
  { key: 'flashcards', label: 'Cards', icon: '🎴' },
  { key: 'profile', label: 'Profile', icon: '👤' },
]

function TutorPage() {
  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Theodore · AI Tutor</h2>
          <p className="page-subtitle">
            Ask questions, review concepts, and let Theodore guide your next study block.
          </p>
        </div>
        <button type="button">New session</button>
      </div>
      <p>
        This is where the chat with Theodore will live in the MVP. We&apos;ll add the full AI
        experience and message list here.
      </p>
    </div>
  )
}

function PlanPage() {
  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Plan · Tasks & Deadlines</h2>
          <p className="page-subtitle">
            Theodore creates a strict but supportive schedule so you always know what to do next.
          </p>
        </div>
        <button type="button">Generate today&apos;s plan</button>
      </div>
      <p>
        In the MVP, this section will hold your daily schedule, tasks, and deadlines generated with
        Theodore.
      </p>
    </div>
  )
}

function FlashcardsPage() {
  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Flashcards</h2>
          <p className="page-subtitle">
            Turn any material into adaptive flashcards and quizzes—subject agnostic by design.
          </p>
        </div>
        <button type="button">Create from notes</button>
      </div>
      <p>
        Here we&apos;ll add flows to upload or paste material, then generate flashcard decks and
        quick quizzes.
      </p>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Profile & Progress</h2>
          <p className="page-subtitle">
            Track your streaks, XP, and upcoming exams. Your discipline dashboard lives here.
          </p>
        </div>
      </div>
      <p>
        This is where we&apos;ll plug in auth (email + password) and progress metrics for the MVP.
      </p>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('tutor')

  const renderActivePage = () => {
    switch (activeTab) {
      case 'tutor':
        return <TutorPage />
      case 'plan':
        return <PlanPage />
      case 'flashcards':
        return <FlashcardsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">S</div>
          <div className="app-title">
            <span className="app-title-main">Studium</span>
            <span className="app-title-tagline">Learn your way.</span>
          </div>
        </div>
        <div className="app-header-right">
          <div className="app-header-chip">MVP · Phase 1</div>
          <button type="button">Sign in</button>
        </div>
      </header>

      <main className="app-main">{renderActivePage()}</main>

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
    </div>
  )
}

export default App

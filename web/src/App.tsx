import { useMemo, useState } from 'react'
import './App.css'

type TabKey = 'tutor' | 'plan' | 'flashcards' | 'profile'

type MessageAuthor = 'theodore' | 'user'

type ChatMessage = {
  id: string
  author: MessageAuthor
  text: string
  createdAt: string
}

type PlanTaskStatus = 'pending' | 'in_progress' | 'done'

type PlanTask = {
  id: string
  title: string
  dueLabel: string
  status: PlanTaskStatus
}

type Flashcard = {
  id: string
  front: string
  back: string
}

type Deck = {
  id: string
  name: string
  cards: Flashcard[]
}

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'tutor', label: 'Tutor', icon: '🧠' },
  { key: 'plan', label: 'Plan', icon: '📅' },
  { key: 'flashcards', label: 'Cards', icon: '🎴' },
  { key: 'profile', label: 'Profile', icon: '👤' },
]

function createId() {
  return Math.random().toString(36).slice(2)
}

type TutorPageProps = {
  messages: ChatMessage[]
  onNewSession: () => void
  onSendMessage: (text: string) => void
}

function TutorPage({ messages, onNewSession, onSendMessage }: TutorPageProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSendMessage(trimmed)
    setInput('')
  }

  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Theodore · AI Tutor</h2>
          <p className="page-subtitle">
            Ask questions, review concepts, and let Theodore guide your next study block.
          </p>
        </div>
        <button type="button" onClick={onNewSession}>
          New session
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxHeight: '320px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: '160px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '0.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                alignSelf: m.author === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                padding: '0.6rem 0.8rem',
                borderRadius:
                  m.author === 'user'
                    ? '1rem 1rem 0.2rem 1rem'
                    : '1rem 1rem 1rem 0.2rem',
                background:
                  m.author === 'user'
                    ? 'linear-gradient(135deg, rgba(41,121,255,0.95), rgba(142,45,226,0.95))'
                    : 'rgba(255,255,255,0.04)',
                color: m.author === 'user' ? '#ffffff' : undefined,
                fontSize: '0.86rem',
              }}
            >
              <div
                style={{
                  marginBottom: '0.15rem',
                  fontSize: '0.7rem',
                  opacity: 0.8,
                  fontWeight: 500,
                }}
              >
                {m.author === 'user' ? 'You' : 'Theodore'}
              </div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.25rem',
          }}
        >
          <input
            type="text"
            placeholder="Ask Theodore a question or share what you're studying…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSend()
              }
            }}
            style={{
              flex: 1,
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'inherit',
              padding: '0.55rem 0.9rem',
              fontSize: '0.85rem',
            }}
          />
          <button type="button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

type PlanPageProps = {
  tasks: PlanTask[]
  onGenerateToday: () => void
  onToggleStatus: (id: string) => void
}

function PlanPage({ tasks, onGenerateToday, onToggleStatus }: PlanPageProps) {
  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Plan · Tasks & Deadlines</h2>
          <p className="page-subtitle">
            Theodore creates a strict but supportive schedule so you always know what to do next.
          </p>
        </div>
        <button type="button" onClick={onGenerateToday}>
          Generate today&apos;s plan
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ fontSize: '0.88rem' }}>
          You don&apos;t have a plan for today yet. Generate one and Theodore will build a focused
          schedule for you.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onToggleStatus(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '0.9rem',
                padding: '0.55rem 0.8rem',
                border: '1px solid rgba(255,255,255,0.05)',
                background:
                  task.status === 'done'
                    ? 'linear-gradient(135deg, rgba(57,255,20,0.25), rgba(0,201,167,0.25))'
                    : 'rgba(0,0,0,0.6)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '999px',
                    border:
                      task.status === 'done'
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.35)',
                    background:
                      task.status === 'done'
                        ? 'radial-gradient(circle at 30% 30%, #ffffff, #39ff14)'
                        : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {task.status === 'done' ? '✓' : ''}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--studium-text-secondary)',
                    }}
                  >
                    {task.dueLabel}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--studium-medium-gray)',
                }}
              >
                {task.status === 'pending'
                  ? 'Planned'
                  : task.status === 'in_progress'
                  ? 'In progress'
                  : 'Completed'}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type FlashcardsPageProps = {
  decks: Deck[]
  onCreateDeck: (name: string) => void
  onAddCard: (deckId: string, front: string, back: string) => void
}

function FlashcardsPage({ decks, onCreateDeck, onAddCard }: FlashcardsPageProps) {
  const [deckName, setDeckName] = useState('')
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [notes, setNotes] = useState('')

  const handleCreateDeck = () => {
    const trimmed = deckName.trim()
    if (!trimmed) return
    onCreateDeck(trimmed)
    setDeckName('')
  }

  const handleAddCard = () => {
    if (!selectedDeckId) return
    const frontTrimmed = front.trim()
    const backTrimmed = back.trim()
    if (!frontTrimmed || !backTrimmed) return
    onAddCard(selectedDeckId, frontTrimmed, backTrimmed)
    setFront('')
    setBack('')
  }

  const handleCreateFromNotes = () => {
    if (!selectedDeckId) return
    const trimmed = notes.trim()
    if (!trimmed) return
    const sentences = trimmed.split(/[\.\n]+/).map((s) => s.trim())
    sentences
      .filter((s) => s.length > 10)
      .slice(0, 8)
      .forEach((sentence) => {
        const frontSide = sentence
        const backSide =
          'Explain this concept in your own words and list 2–3 key points you want to remember.'
        onAddCard(selectedDeckId, frontSide, backSide)
      })
    setNotes('')
  }

  const selectedDeck =
    (selectedDeckId && decks.find((d) => d.id === selectedDeckId)) || decks[0] || null

  return (
    <div className="page-card">
      <div className="page-header">
        <div className="page-header-title">
          <h2 className="page-title">Flashcards</h2>
          <p className="page-subtitle">
            Turn any material into adaptive flashcards and quizzes—subject agnostic by design.
          </p>
        </div>
        <button type="button" onClick={handleCreateFromNotes}>
          Create from notes
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.6fr)',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              type="text"
              placeholder="New deck name (e.g. Biology – Cells)"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              style={{
                flex: 1,
                borderRadius: '0.8rem',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'inherit',
                padding: '0.45rem 0.75rem',
                fontSize: '0.85rem',
              }}
            />
            <button type="button" onClick={handleCreateDeck}>
              Add deck
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {decks.length === 0 ? (
              <p style={{ fontSize: '0.84rem' }}>
                No decks yet. Start by creating one for the topic you&apos;re working on today.
              </p>
            ) : (
              decks.map((deck) => {
                const isSelected = deck.id === selectedDeckId
                return (
                  <button
                    key={deck.id}
                    type="button"
                    onClick={() => setSelectedDeckId(deck.id)}
                    style={{
                      textAlign: 'left',
                      borderRadius: '0.8rem',
                      padding: '0.45rem 0.7rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(41,121,255,0.45), rgba(142,45,226,0.45))'
                        : 'rgba(0,0,0,0.6)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '0.9rem' }}>{deck.name}</div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--studium-text-secondary)',
                      }}
                    >
                      {deck.cards.length} card{deck.cards.length === 1 ? '' : 's'}
                    </div>
                  </button>
                )
              })
            )}
          </div>

          <textarea
            placeholder="Paste your notes or textbook paragraphs here. Theodore will turn them into starter cards for you."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            style={{
              resize: 'vertical',
              borderRadius: '0.9rem',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'inherit',
              padding: '0.6rem 0.8rem',
              fontSize: '0.84rem',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div className="page-header-title">
            <h3 className="page-title" style={{ fontSize: '1.05rem' }}>
              {selectedDeck ? selectedDeck.name : 'Select a deck to add cards'}
            </h3>
            {selectedDeck && (
              <p className="page-subtitle" style={{ fontSize: '0.8rem' }}>
                Add cards manually or generate them from your notes on the left.
              </p>
            )}
          </div>

          {selectedDeck && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <input
                  type="text"
                  placeholder="Front – question or prompt"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  style={{
                    borderRadius: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'inherit',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Back – answer, explanation, or formula"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  style={{
                    borderRadius: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'inherit',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={handleAddCard}>
                    Add card
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: '0.3rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '0.5rem',
                  maxHeight: '180px',
                  overflowY: 'auto',
                }}
              >
                {selectedDeck.cards.map((card: Flashcard) => (
                  <div
                    key={card.id}
                    style={{
                      borderRadius: '0.9rem',
                      padding: '0.5rem 0.55rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background:
                        'radial-gradient(circle at top left, rgba(41,121,255,0.35), transparent 60%), rgba(0,0,0,0.75)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{card.front}</div>
                    <div style={{ color: 'var(--studium-text-secondary)' }}>{card.back}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

type ProfilePageProps = {
  completedTasks: number
  totalTasks: number
  totalCards: number
  totalMessages: number
}

function ProfilePage({
  completedTasks,
  totalTasks,
  totalCards,
  totalMessages,
}: ProfilePageProps) {
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / Math.max(totalTasks, 1)) * 100)

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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.8rem',
        }}
      >
        <div
          style={{
            borderRadius: '1rem',
            padding: '0.7rem 0.8rem',
            border: '1px solid rgba(255,255,255,0.08)',
            background:
              'radial-gradient(circle at top, rgba(57,255,20,0.38), transparent 60%), rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>Daily discipline score</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{completionRate}%</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--studium-text-secondary)' }}>
            {completedTasks}/{totalTasks || 1} tasks completed today
          </div>
        </div>

        <div
          style={{
            borderRadius: '1rem',
            padding: '0.7rem 0.8rem',
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>Flashcards created</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{totalCards}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--studium-text-secondary)' }}>
            Subject‑agnostic decks ready for review
          </div>
        </div>

        <div
          style={{
            borderRadius: '1rem',
            padding: '0.7rem 0.8rem',
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>Chats with Theodore</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{totalMessages}</div>
          <div style={{ fontSize: '0.74rem', color: 'var(--studium-text-secondary)' }}>
            Questions asked & explanations received
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('tutor')
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      author: 'theodore',
      text: `Welcome back. Let’s make this session focused and productive. What are you studying today, and what would you like to achieve by the end of this block?`,
      createdAt: new Date().toISOString(),
    },
  ])
  const [tasks, setTasks] = useState<PlanTask[]>([])
  const [decks, setDecks] = useState<Deck[]>([])

  const handleNewTutorSession = () => {
    setMessages([
      {
        id: createId(),
        author: 'theodore',
        text: `New session started. Briefly tell me your goal for this study block, and I’ll help you structure it.`,
        createdAt: new Date().toISOString(),
      },
    ])
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

    setMessages((prev) => [...prev, userMessage, theoMessage])
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
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        if (task.status === 'pending') return { ...task, status: 'in_progress' }
        if (task.status === 'in_progress') return { ...task, status: 'done' }
        return { ...task, status: 'pending' }
      }),
    )
  }

  const handleCreateDeck = (name: string) => {
    setDecks((prev) => [...prev, { id: createId(), name, cards: [] }])
  }

  const handleAddCard = (deckId: string, front: string, back: string) => {
    setDecks((prev) =>
      prev.map((deck) =>
        deck.id === deckId
          ? {
              ...deck,
              cards: [...deck.cards, { id: createId(), front, back }],
            }
          : deck,
      ),
    )
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

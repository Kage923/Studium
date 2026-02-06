export type ProfilePageProps = {
  completedTasks: number
  totalTasks: number
  totalCards: number
  totalMessages: number
}

export function ProfilePage({
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


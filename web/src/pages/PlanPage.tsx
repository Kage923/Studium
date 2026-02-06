import type { PlanTask } from '../types'

export type PlanPageProps = {
  tasks: PlanTask[]
  onGenerateToday: () => void
  onToggleStatus: (id: string) => void
}

export function PlanPage({ tasks, onGenerateToday, onToggleStatus }: PlanPageProps) {
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


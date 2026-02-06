import { useState } from 'react'
import type { ChatMessage } from '../types'

export type TutorPageProps = {
  messages: ChatMessage[]
  onNewSession: () => void
  onSendMessage: (text: string) => void
}

export function TutorPage({ messages, onNewSession, onSendMessage }: TutorPageProps) {
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


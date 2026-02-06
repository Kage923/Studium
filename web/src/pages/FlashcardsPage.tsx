import { useState } from 'react'
import type { Deck, Flashcard } from '../types'

export type FlashcardsPageProps = {
  decks: Deck[]
  onCreateDeck: (name: string) => void
  onAddCard: (deckId: string, front: string, back: string) => void
}

export function FlashcardsPage({ decks, onCreateDeck, onAddCard }: FlashcardsPageProps) {
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

      <div className="flashcards-grid">
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


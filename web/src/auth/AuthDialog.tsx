import { useState } from 'react'
import { useAuth } from './AuthContext'

type Mode = 'sign_in' | 'sign_up'

export type AuthDialogProps = {
  open: boolean
  onClose: () => void
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { signIn, signUp, user, signOut } = useAuth()
  const [mode, setMode] = useState<Mode>('sign_in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'sign_in') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      onClose()
    } catch (err) {
      // Deliberately show a clear, user‑friendly message instead of the raw Firebase error
      if (mode === 'sign_in') {
        setError(
          'Sign in failed. Please check your email and password, or create a new account if you are new to Studium.',
        )
      } else {
        setError(
          'We could not create your account. Please use a valid email and a password with at least 6 characters, then try again.',
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    setError(null)
    setSubmitting(true)
    try {
      await signOut()
      onClose()
    } catch (err) {
      const message =
        (err && typeof err === 'object' && 'message' in err && String((err as any).message)) ||
        'Unable to sign out. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const title = user
    ? 'Account'
    : mode === 'sign_in'
    ? 'Sign in to Studium'
    : 'Create your Studium account'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          margin: '0 1.25rem',
          borderRadius: '1.4rem',
          padding: '1.4rem 1.3rem 1.25rem',
          background:
            'radial-gradient(circle at top, rgba(41,121,255,0.4), transparent 65%), rgba(0,0,0,0.9)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 28px 60px rgba(0,0,0,0.9)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.6rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Studium</div>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '0.1rem 0.55rem',
              backgroundColor: 'rgba(0,0,0,0.7)',
              fontSize: '0.75rem',
            }}
          >
            Close
          </button>
        </div>

        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div
              style={{
                borderRadius: '0.9rem',
                padding: '0.6rem 0.7rem',
                backgroundColor: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ opacity: 0.8, fontSize: '0.78rem' }}>Signed in as</div>
              <div>{user.email}</div>
            </div>
            <button type="button" onClick={handleSignOut} disabled={submitting}>
              {submitting ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.4rem' }}
          >
            <div
              style={{
                display: 'inline-flex',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '0.1rem',
                marginBottom: '0.2rem',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setMode('sign_in')
                  setEmail('')
                  setPassword('')
                  setError(null)
                }}
                style={{
                  flex: 1,
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px',
                  border: 'none',
                  background:
                    mode === 'sign_in'
                      ? 'linear-gradient(135deg, rgba(41,121,255,0.9), rgba(142,45,226,0.9))'
                      : 'transparent',
                  fontSize: '0.78rem',
                }}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('sign_up')
                  setEmail('')
                  setPassword('')
                  setError(null)
                }}
                style={{
                  flex: 1,
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px',
                  border: 'none',
                  background:
                    mode === 'sign_up'
                      ? 'linear-gradient(135deg, rgba(41,121,255,0.9), rgba(142,45,226,0.9))'
                      : 'transparent',
                  fontSize: '0.78rem',
                }}
              >
                Sign up
              </button>
            </div>

            <label style={{ fontSize: '0.8rem' }}>
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginTop: '0.2rem',
                  width: '100%',
                  borderRadius: '0.8rem',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'inherit',
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.85rem',
                }}
              />
            </label>

            <label style={{ fontSize: '0.8rem' }}>
              Password
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  marginTop: '0.2rem',
                  width: '100%',
                  borderRadius: '0.8rem',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'inherit',
                  padding: '0.45rem 0.7rem',
                  fontSize: '0.85rem',
                }}
              />
            </label>

            {error && <div style={{ fontSize: '0.78rem', color: '#ff8a80' }}>{error}</div>}

            <button type="submit" disabled={submitting}>
              {submitting
                ? mode === 'sign_in'
                  ? 'Signing in…'
                  : 'Creating account…'
                : mode === 'sign_in'
                ? 'Sign in'
                : 'Sign up'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}


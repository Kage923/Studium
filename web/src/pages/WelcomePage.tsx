type WelcomePageProps = {
  onOpenAuth: () => void
}

export function WelcomePage({ onOpenAuth }: WelcomePageProps) {
  return (
    <div className="page-card welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-title">Learn your way.</h1>
        <p className="welcome-subtitle">
          Theodore is your AI tutor: plan your day, build flashcards, and stay on track—all in one place.
        </p>
        <ul className="welcome-features">
          <li>Chat with Theodore for study guidance</li>
          <li>Daily tasks and deadlines</li>
          <li>Flashcards from your notes</li>
          <li>Track progress and streaks</li>
        </ul>
        <button type="button" onClick={onOpenAuth} className="welcome-cta">
          Sign in to get started
        </button>
        <p className="welcome-hint">
          New here? Use the same button to create an account.
        </p>
      </div>
    </div>
  )
}

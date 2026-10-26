import { use } from 'react'

function MessageComponent({ promise }) {
  const message = use(promise)

  return (
    <article className="message-card" aria-live="polite">
      <span className="message-card__icon" aria-hidden="true">✓</span>
      <div>
        <p className="message-card__label">Відповідь сервера</p>
        <p className="message-card__text">{message}</p>
      </div>
    </article>
  )
}

export default MessageComponent
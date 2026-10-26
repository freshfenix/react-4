import { Suspense, useState } from 'react'
import MessageComponent from './components/MessageComponent.jsx'
import './App.css'

function fetchMessage(requestNumber) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(`Запит №${requestNumber}: дані успішно отримано із сервера.`)
    }, 1100)
  })
}

function App() {
  const [request, setRequest] = useState(() => ({
    number: 1,
    promise: fetchMessage(1),
  }))
  const [isRefreshing, setIsRefreshing] = useState(false)

  function refreshMessage() {
    const number = request.number + 1
    setIsRefreshing(true)
    setRequest({
      number,
      promise: fetchMessage(number).finally(() => setIsRefreshing(false)),
    })
  }

  return (
    <main className="page-shell">
      <section className="demo-panel">
        <div className="eyebrow"><span className="eyebrow__dot" /> React 19 <span className="eyebrow__divider">/</span> async lab</div>
        <h1>Дані на<br /><span>вимогу.</span></h1>
        <p className="intro">
          Запускай запит і спостерігай, як <code>use()</code> читає Promise.
          Кожне оновлення має власний номер.
        </p>

        <div className="request-heading">
          <span className="request-heading__label">Результат запиту</span>
          <span className="request-heading__number">№ {String(request.number).padStart(2, '0')}</span>
        </div>

        <div className="result-stage" aria-busy={isRefreshing}>
          <Suspense fallback={<p className="loading" role="status"><span className="spinner" />З’єднуємося із сервером…</p>}>
            <MessageComponent promise={request.promise} />
          </Suspense>
        </div>

        <button className="refresh-button" type="button" onClick={refreshMessage} disabled={isRefreshing}>
          <span className={isRefreshing ? 'refresh-button__icon refresh-button__icon--spinning' : 'refresh-button__icon'} aria-hidden="true">↻</span>
          {isRefreshing ? 'Запит виконується…' : 'Надіслати ще раз'}
          {!isRefreshing && <span className="refresh-button__arrow" aria-hidden="true">↗</span>}
        </button>

        <div className="panel-footnote"><span className="status-light" /> Promise передається як пропс у компонент</div>
      </section>
      <footer><span>ASYNC PLAYGROUND</span><span>Зроблено на React <b>✳</b></span></footer>
    </main>
  )
}

export default App

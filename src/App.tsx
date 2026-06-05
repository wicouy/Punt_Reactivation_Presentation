import { useState } from 'react'
import Header from './components/Header'
import InfiniteScroll from './components/InfiniteScroll'

const PASSWORD = '20.Pelota'

export default function App() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-mesh bg-grid font-dm-sans flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col gap-4 w-80">
          <h1 className="text-white text-xl font-semibold text-center">Password</h1>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (input === PASSWORD) setUnlocked(true)
                else setError(true)
              }
            }}
            className="rounded-lg px-4 py-2 bg-white/20 text-white placeholder-white/50 outline-none border border-white/30 focus:border-white/60"
            placeholder="Ingresá la contraseña"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm text-center">Contraseña incorrecta</p>}
          <button
            onClick={() => { if (input === PASSWORD) setUnlocked(true); else setError(true) }}
            className="bg-white/20 hover:bg-white/30 text-white rounded-lg py-2 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mesh bg-grid font-dm-sans">
      <Header />
      <InfiniteScroll />
    </div>
  )
}

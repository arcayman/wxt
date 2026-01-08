import { useState } from 'react'
import { Header } from './Header'
import { SavedItems } from './SavedItems'

type Route = 'home' | 'saved'

function Home() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">
        Home
      </h2>

      <p className="text-sm text-gray-400">
        Detect content and save it from anywhere.
      </p>
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState<Route>('home')

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Shared UI */}
      <Header route={route} onNavigate={setRoute} />

      {/* Routed UI */}
      <main className="flex-1 overflow-auto">
        {route === 'home' && <Home />}
        {route === 'saved' && <SavedItems onNavigate={setRoute} />}
      </main>
    </div>
  )
}

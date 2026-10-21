import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import type { Route } from './components/Navigation'
import { Dashboard } from './pages/Dashboard'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { Reader } from './pages/Reader'

const hashes: Record<Route, string> = { dashboard: '', scenes: '#scenes', characters: '#characters', timeline: '#timeline', media: '#media-library', maps: '#story-maps', settings: '#settings', read: '#read' }
const routeForHash = (hash: string): Route => (Object.entries(hashes).find(([, value]) => value === hash)?.[0] as Route) ?? 'dashboard'

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeForHash(window.location.hash))
  useEffect(() => { const listener = () => setRoute(routeForHash(window.location.hash)); window.addEventListener('hashchange', listener); return () => window.removeEventListener('hashchange', listener) }, [])
  const navigate = (next: Route) => { if (next !== route) { window.location.hash = hashes[next]; window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const page = route === 'dashboard' ? <Dashboard onNavigate={navigate} /> : route === 'read' ? <Reader onNavigate={navigate} /> : <PlaceholderPage page={route} />
  return <Layout route={route} onNavigate={navigate}>{page}</Layout>
}

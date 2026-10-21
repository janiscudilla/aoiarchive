import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import type { Route } from './components/Navigation'
import { Dashboard } from './pages/Dashboard'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { Reader } from './pages/Reader'

const paths: Record<Route, string> = { dashboard: '/', scenes: '/scenes', characters: '/characters', timeline: '/timeline', media: '/media-library', maps: '/story-maps', settings: '/settings', read: '/read' }
const routeForPath = (path: string): Route => (Object.entries(paths).find(([, value]) => value === path)?.[0] as Route) ?? 'dashboard'

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeForPath(window.location.pathname))
  useEffect(() => { const listener = () => setRoute(routeForPath(window.location.pathname)); window.addEventListener('popstate', listener); return () => window.removeEventListener('popstate', listener) }, [])
  const navigate = (next: Route) => { if (next !== route) { window.history.pushState({}, '', paths[next]); setRoute(next); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const page = route === 'dashboard' ? <Dashboard onNavigate={navigate} /> : route === 'read' ? <Reader onNavigate={navigate} /> : <PlaceholderPage page={route} />
  return <Layout route={route} onNavigate={navigate}>{page}</Layout>
}

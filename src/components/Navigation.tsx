import { release } from '../config/release'
import { Brand } from './Brand'

export type Route = 'dashboard' | 'scenes' | 'characters' | 'timeline' | 'media' | 'maps' | 'settings' | 'read'

type NavItem = { route: Route; label: string; icon: string }

const primaryItems: NavItem[] = [
  { route: 'dashboard', label: 'Archive', icon: '⌂' },
  { route: 'scenes', label: 'Scenes', icon: '◇' },
  { route: 'characters', label: 'Characters', icon: '♙' },
  { route: 'timeline', label: 'Timeline', icon: '◷' },
  { route: 'media', label: 'Media Library', icon: '▧' },
  { route: 'maps', label: 'Story Maps', icon: '⌘' },
]

function NavButton({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: (route: Route) => void }) {
  return <button onClick={() => onNavigate(item.route)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active ? 'bg-[#e8e1d5] font-medium text-stone-900' : 'text-stone-500 hover:bg-[#eee8dd] hover:text-stone-800'}`}>
    <span className="w-4 text-center text-base leading-none">{item.icon}</span>{item.label}
  </button>
}

export function Sidebar({ route, onNavigate }: { route: Route; onNavigate: (route: Route) => void }) {
  return <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-stone-200 bg-[#f6f1e8] px-5 py-7 lg:flex">
    <Brand />
    <nav className="mt-12 space-y-1" aria-label="Primary navigation">
      {primaryItems.map((item) => <NavButton key={item.route} item={item} active={route === item.route || (route === 'read' && item.route === 'scenes')} onNavigate={onNavigate} />)}
    </nav>
    <div className="mt-auto space-y-4">
      <NavButton item={{ route: 'settings', label: 'Settings', icon: '⚙' }} active={route === 'settings'} onNavigate={onNavigate} />
      <p className="border-t border-stone-200 pt-4 text-[11px] tracking-wide text-stone-400">{release.build}<br />Released {release.date}</p>
    </div>
  </aside>
}

export function MobileHeader({ route, onNavigate }: { route: Route; onNavigate: (route: Route) => void }) {
  const title = route === 'dashboard' ? 'Archive' : route === 'read' ? 'Reading' : primaryItems.find((item) => item.route === route)?.label ?? 'Settings'
  return <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-stone-200 bg-[#f6f1e8]/95 px-5 backdrop-blur lg:hidden">
    <button onClick={() => onNavigate('dashboard')} aria-label="Go to archive"><Brand compact /></button>
    <span className="text-sm font-medium text-stone-700">{title}</span>
    <span className="text-[10px] tracking-wide text-stone-400">{release.build}</span>
  </header>
}

export function MobileNav({ route, onNavigate }: { route: Route; onNavigate: (route: Route) => void }) {
  const items = primaryItems.slice(0, 4)
  return <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-stone-200 bg-[#f6f1e8]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden" aria-label="Mobile navigation">
    {items.map((item) => <button key={item.route} onClick={() => onNavigate(item.route)} className={`flex min-w-14 flex-col items-center gap-1 rounded-md px-2 py-1 text-[10px] ${route === item.route || (route === 'read' && item.route === 'scenes') ? 'text-stone-900' : 'text-stone-400'}`}><span className="text-base leading-none">{item.icon}</span>{item.label}</button>)}
  </nav>
}

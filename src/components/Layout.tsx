import type { ReactNode } from 'react'
import { MobileHeader, MobileNav, Sidebar, type Route } from './Navigation'

export function Layout({ route, onNavigate, children }: { route: Route; onNavigate: (route: Route) => void; children: ReactNode }) {
  return <div className="min-h-screen bg-[#f6f1e8] text-stone-800"><Sidebar route={route} onNavigate={onNavigate} /><MobileHeader route={route} onNavigate={onNavigate} /><main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">{children}</main><MobileNav route={route} onNavigate={onNavigate} /></div>
}

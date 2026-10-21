import type { Route } from '../components/Navigation'

const entries = [
  { title: 'A room with an open window', collection: 'Untitled collection', detail: 'Draft · Updated just now', tone: 'bg-[#dce6d5]' },
  { title: 'Notes on the amber season', collection: 'Fragments', detail: 'Idea · Updated yesterday', tone: 'bg-[#ead9bf]' },
  { title: 'The hours between rain', collection: 'Field notes', detail: 'Draft · Updated 4 days ago', tone: 'bg-[#d9e1e5]' },
]

export function Dashboard({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return <section className="mx-auto max-w-6xl px-5 py-9 sm:px-10 sm:py-14 lg:px-16">
    <div className="flex items-end justify-between gap-5"><div><p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-400">Private archive</p><h1 className="font-serif text-4xl tracking-tight text-stone-800 sm:text-5xl">Good morning.</h1><p className="mt-3 max-w-md text-sm leading-6 text-stone-500">A quiet place for the stories still taking shape.</p></div><button className="rounded-full bg-stone-800 px-4 py-2.5 text-sm text-[#f9f5ed] transition hover:bg-stone-700">+ New scene</button></div>
    <div className="mt-12 grid gap-5 md:grid-cols-[1.5fr_1fr]"><section><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-2xl">Continue writing</h2><button onClick={() => onNavigate('scenes')} className="text-xs font-medium text-stone-500 hover:text-stone-800">View all scenes →</button></div><div className="space-y-3">{entries.map((entry) => <button onClick={() => onNavigate('read')} key={entry.title} className="group flex w-full items-center gap-4 rounded-xl border border-stone-200 bg-[#faf7f1] p-4 text-left transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-sm"><span className={`size-12 shrink-0 rounded-lg ${entry.tone}`} /><span className="min-w-0"><span className="block truncate font-serif text-lg text-stone-800">{entry.title}</span><span className="mt-1 block text-xs text-stone-500">{entry.collection} · {entry.detail}</span></span><span className="ml-auto text-stone-300 group-hover:text-stone-700">→</span></button>)}</div></section>
    <aside className="rounded-xl border border-stone-200 bg-[#eee7da] p-6"><p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400">Archive at a glance</p><dl className="mt-7 space-y-5"><div><dt className="text-xs text-stone-500">Scenes in progress</dt><dd className="mt-1 font-serif text-3xl">03</dd></div><div><dt className="text-xs text-stone-500">Characters to develop</dt><dd className="mt-1 font-serif text-3xl">07</dd></div><div><dt className="text-xs text-stone-500">Last writing session</dt><dd className="mt-1 text-sm text-stone-700">A moment ago</dd></div></dl></aside></div>
  </section>
}

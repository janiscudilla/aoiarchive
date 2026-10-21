const content: Record<string, { eyebrow: string; title: string; copy: string; action: string }> = {
  scenes: { eyebrow: 'Drafts and chapters', title: 'Scenes', copy: 'Gather moments, fragments, and full chapters in one considered workspace.', action: 'New scene' },
  characters: { eyebrow: 'People and voices', title: 'Characters', copy: 'Keep the people in your stories close—their details, connections, and unwritten possibilities.', action: 'Add character' },
  timeline: { eyebrow: 'Story chronology', title: 'Timeline', copy: 'Lay out events at their own pace, from a single afternoon to an entire lifetime.', action: 'Add event' },
  media: { eyebrow: 'References and atmosphere', title: 'Media Library', copy: 'A home for visual references, research, and the small things that set a scene.', action: 'Add media' },
  maps: { eyebrow: 'Connections and places', title: 'Story Maps', copy: 'Trace relationships, locations, and the paths between the stories you are building.', action: 'Create map' },
  settings: { eyebrow: 'Archive preferences', title: 'Settings', copy: 'Personalize your archive and keep its foundations deliberately simple.', action: 'Save preferences' },
}

export function PlaceholderPage({ page }: { page: keyof typeof content }) {
  const item = content[page]
  return <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col justify-center px-5 py-16 sm:px-10 lg:min-h-screen lg:px-16">
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">{item.eyebrow}</p><h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">{item.title}</h1><p className="mt-6 max-w-xl text-base leading-8 text-stone-500">{item.copy}</p>
    <div className="mt-10 rounded-xl border border-dashed border-stone-300 bg-[#faf7f1]/60 p-7 sm:p-10"><p className="font-serif text-xl text-stone-700">This space is waiting for its first entry.</p><p className="mt-2 text-sm leading-6 text-stone-500">Build 001 establishes the archive structure; working tools will arrive in later builds.</p><button className="mt-6 rounded-full bg-stone-800 px-4 py-2.5 text-sm text-[#faf7f1]">{item.action}</button></div>
  </section>
}

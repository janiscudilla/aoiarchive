export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full border border-stone-400 text-sm font-semibold tracking-tighter text-stone-700">A</span>
      {!compact && <span className="font-serif text-xl tracking-tight text-stone-800">AOI Archive</span>}
    </div>
  )
}

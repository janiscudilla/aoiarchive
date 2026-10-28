import { useEffect, useState, type ReactNode } from 'react'
import { SceneEditor } from '../components/SceneEditor'
import { useArchiveAccess } from '../hooks/useArchiveAccess'
import { createScene, deleteScene, listScenes, newSceneInput, readScene, updateScene, type SceneInput, type SceneRecord } from '../lib/scenes'

function AccessMessage({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col justify-center px-5 py-16 sm:px-10 lg:min-h-screen"><p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Private writing workspace</p><h1 className="mt-4 font-serif text-4xl tracking-tight">{title}</h1><div className="mt-5 text-sm leading-7 text-stone-500">{children}</div></section>
}

export function ScenesWorkspace() {
  const { access, user, error: authError, signIn, signOutUser } = useArchiveAccess()
  const [scenes, setScenes] = useState<SceneRecord[]>([])
  const [selected, setSelected] = useState<SceneRecord | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (access !== 'owner') return
    setLoading(true)
    listScenes().then((items) => { setScenes(items); setSelected(items[0] ?? null) }).catch(() => setError('Scenes could not be loaded. Confirm Firestore is enabled and the owner UID matches the deployed rules.')).finally(() => setLoading(false))
  }, [access])

  if (access === 'setup') return <AccessMessage title="Firebase setup required"><p>This public build has no Firebase configuration, so private archive access is disabled by design. Add the values from <code>.env.example</code>, configure Google Authentication, and deploy matching Firestore rules before sign-in can be used.</p></AccessMessage>
  if (access === 'owner-setup') return <AccessMessage title="Identify the archive owner"><p>Sign in with the intended owner Google account to retrieve its Firebase UID. This setup step never reads or writes Firestore and does not grant archive access.</p>{authError && <p className="mt-4 text-red-700">{authError}</p>}{user ? <div className="mt-6 rounded-lg border border-stone-200 bg-[#faf7f1] p-4"><p className="text-xs uppercase tracking-[0.15em] text-stone-400">Firebase UID</p><code className="mt-2 block break-all text-sm text-stone-700">{user.uid}</code><p className="mt-3 text-xs text-stone-500">Copy this UID, then sign out and provide it to configure owner-only access.</p><button onClick={signOutUser} className="mt-4 text-sm font-medium text-stone-600 underline underline-offset-4">Sign out</button></div> : <button onClick={signIn} className="mt-7 rounded-full bg-stone-800 px-5 py-3 text-sm text-[#faf7f1]">Continue with Google</button>}</AccessMessage>
  if (access === 'loading') return <AccessMessage title="Checking archive access"><p>Verifying your private workspace…</p></AccessMessage>
  if (access === 'signed-out') return <AccessMessage title="Your archive is private"><p>Sign in with the configured Google account to request access. A successful Google sign-in does not grant archive access unless its Firebase UID matches the configured owner UID.</p>{authError && <p className="mt-4 text-red-700">{authError}</p>}<button onClick={signIn} className="mt-7 rounded-full bg-stone-800 px-5 py-3 text-sm text-[#faf7f1]">Continue with Google</button></AccessMessage>
  if (access === 'unauthorized') return <AccessMessage title="This archive is not available to this account"><p>{user?.email ?? 'This Google account'} is signed in, but is not the configured owner. No archive content has been loaded.</p><button onClick={signOutUser} className="mt-7 text-sm font-medium text-stone-600 underline underline-offset-4">Sign out</button></AccessMessage>

  async function addScene() {
    setError(null); setSaving(true)
    try { const id = await createScene(newSceneInput()); const next = await readScene(id); if (next) { setScenes((items) => [...items, next]); setSelected(next) } } catch (cause) { setError(cause instanceof Error ? cause.message : 'Scene could not be created.') } finally { setSaving(false) }
  }
  async function saveScene(input: SceneInput): Promise<boolean> {
    if (!selected) return false
    setError(null); setSaving(true)
    try { await updateScene(selected.id, input); const next = await readScene(selected.id); if (next) { setSelected(next); setScenes((items) => items.map((item) => item.id === next.id ? next : item)) }; return true } catch (cause) { setError(cause instanceof Error ? cause.message : 'Scene could not be saved.'); return false } finally { setSaving(false) }
  }
  async function removeScene() {
    if (!selected || !window.confirm(`Delete “${selected.title}”?`)) return
    setError(null); setSaving(true)
    try { await deleteScene(selected.id); setScenes((items) => items.filter((item) => item.id !== selected.id)); setSelected(null) } catch { setError('Scene could not be deleted.') } finally { setSaving(false) }
  }

  return <section className="mx-auto max-w-7xl px-5 py-8 sm:px-10 lg:px-12"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">Private writing workspace</p><h1 className="mt-2 font-serif text-4xl tracking-tight">Scenes</h1></div><div className="flex items-center gap-4"><span className="hidden text-xs text-stone-400 sm:inline">{user?.email}</span><button onClick={signOutUser} className="text-xs text-stone-500 hover:text-stone-800">Sign out</button><button onClick={addScene} disabled={saving} className="rounded-full bg-stone-800 px-4 py-2.5 text-sm text-[#faf7f1]">+ New scene</button></div></div>{error && <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}<div className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]"><aside className="rounded-xl border border-stone-200 bg-[#eee7da] p-3"><p className="px-2 pb-2 text-xs font-medium uppercase tracking-[0.15em] text-stone-400">Directory</p>{loading ? <p className="px-2 py-4 text-sm text-stone-500">Loading scenes…</p> : scenes.length ? <div className="space-y-1">{scenes.map((scene) => <button key={scene.id} onClick={() => setSelected(scene)} className={`w-full rounded-lg px-3 py-3 text-left ${selected?.id === scene.id ? 'bg-[#faf7f1] shadow-sm' : 'hover:bg-[#f6f1e8]'}`}><span className="block truncate font-serif text-base text-stone-800">{scene.title}</span><span className="mt-1 block text-[11px] text-stone-400">{scene.status} · #{scene.narrative.sequence}</span></button>)}</div> : <p className="px-2 py-4 text-sm leading-6 text-stone-500">No scenes yet. Create a first private draft.</p>}</aside><div>{selected ? <SceneEditor key={selected.id} scene={selected} saving={saving} onSave={saveScene} onDelete={removeScene} /> : <div className="grid min-h-80 place-items-center rounded-xl border border-dashed border-stone-300 bg-[#faf7f1]/60 p-8 text-center"><div><p className="font-serif text-xl">Start with a scene.</p><p className="mt-2 text-sm text-stone-500">This initial editor supports paragraphs, headings, emphasis, and lists.</p><button onClick={addScene} className="mt-5 rounded-full bg-stone-800 px-4 py-2 text-sm text-[#faf7f1]">Create scene</button></div></div>}</div></div></section>
}

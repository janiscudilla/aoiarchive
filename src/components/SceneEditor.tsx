import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
import type { SceneInput, SceneRecord } from '../lib/scenes'

type SaveState = 'saved' | 'saving' | 'unsaved' | 'failed'
type Props = { scene: SceneRecord; saving: boolean; onSave: (input: SceneInput) => Promise<boolean>; onDelete: () => void }

export function SceneEditor({ scene, saving, onSave, onDelete }: Props) {
  const [saveState, setSaveState] = useState<SaveState>('saved')
  const titleRef = useRef(scene.title)
  const statusRef = useRef(scene.status)
  const contentRef = useRef(scene.content)
  const sceneRef = useRef(scene)
  const onSaveRef = useRef(onSave)
  const saveTimerRef = useRef<number | null>(null)
  const savingRef = useRef(false)
  const saveQueuedRef = useRef(false)

  useEffect(() => { sceneRef.current = scene }, [scene])
  useEffect(() => { onSaveRef.current = onSave }, [onSave])
  useEffect(() => () => { if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current) }, [])

  async function saveLatest() {
    if (savingRef.current) {
      saveQueuedRef.current = true
      return
    }

    savingRef.current = true
    setSaveState('saving')
    const current = sceneRef.current
    const saved = await onSaveRef.current({
      ...current,
      title: titleRef.current,
      status: statusRef.current,
      content: contentRef.current,
    })
    savingRef.current = false
    setSaveState(saved ? 'saved' : 'failed')

    if (saveQueuedRef.current) {
      saveQueuedRef.current = false
      void saveLatest()
    }
  }

  function scheduleSave() {
    setSaveState('unsaved')
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      saveTimerRef.current = null
      void saveLatest()
    }, 1000)
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: scene.content,
    editorProps: { attributes: { class: 'scene-prose min-h-72 outline-none' } },
    onUpdate: ({ editor: updatedEditor }) => {
      contentRef.current = updatedEditor.getJSON()
      scheduleSave()
    },
  }, [scene.id])

  if (!editor) return <div className="p-8 text-sm text-stone-500">Preparing editor…</div>
  const toggle = (command: () => boolean) => () => command()
  const saveLabel = saveState === 'saving' || saving ? 'Saving…' : saveState === 'unsaved' ? 'Unsaved changes' : saveState === 'failed' ? 'Couldn’t save — retry' : 'Saved'

  return <section className="rounded-xl border border-stone-200 bg-[#faf7f1] shadow-sm">
    <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 px-4 py-3">
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleBold().run())} aria-label="Bold"><b>B</b></button>
      <button className="editor-tool italic" onClick={toggle(() => editor.chain().focus().toggleItalic().run())} aria-label="Italic">I</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}>H2</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleBulletList().run())} aria-label="Bulleted list">• List</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleOrderedList().run())} aria-label="Numbered list">1. List</button>
      <span className="mx-1 h-5 border-l border-stone-200" />
      <select defaultValue={scene.status} onChange={(event) => { statusRef.current = event.target.value as SceneRecord['status']; scheduleSave() }} className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600" aria-label="Scene status"><option value="draft">Draft</option><option value="published">Published</option></select>
      <div className="ml-auto flex items-center gap-3"><span className={`text-xs ${saveState === 'failed' ? 'text-red-700' : 'text-stone-400'}`} aria-live="polite">{saveLabel}</span><button className="text-xs text-stone-400 hover:text-red-700" onClick={onDelete}>Delete</button><button className="rounded-full bg-stone-800 px-3 py-1.5 text-xs text-[#faf7f1]" disabled={saving} onClick={() => void saveLatest()}>{saveState === 'failed' ? 'Retry save' : 'Save now'}</button></div>
    </div>
    <div className="p-5 sm:p-8"><input defaultValue={scene.title} onChange={(event) => { titleRef.current = event.target.value; scheduleSave() }} className="w-full border-0 bg-transparent font-serif text-3xl tracking-tight outline-none placeholder:text-stone-300 sm:text-4xl" aria-label="Scene title" /><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-400"><span>Continuity: {scene.continuityId}</span><span>Sequence: {scene.narrative.sequence}</span><span>Event date: {scene.fictionalEventDate ?? 'Unspecified'}</span></div><div className="mt-8"><EditorContent editor={editor} /></div></div>
  </section>
}

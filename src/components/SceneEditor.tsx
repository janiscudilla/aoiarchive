import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { SceneInput, SceneRecord } from '../lib/scenes'

type Props = { scene: SceneRecord; saving: boolean; onSave: (input: SceneInput) => void; onDelete: () => void }

export function SceneEditor({ scene, saving, onSave, onDelete }: Props) {
  const editor = useEditor({ extensions: [StarterKit], content: scene.content, editorProps: { attributes: { class: 'scene-prose min-h-72 outline-none' } } }, [scene.id])

  if (!editor) return <div className="p-8 text-sm text-stone-500">Preparing editor…</div>
  const toggle = (command: () => boolean) => () => command()

  function save() {
    onSave({ ...scene, content: editor.getJSON() })
  }

  return <section className="rounded-xl border border-stone-200 bg-[#faf7f1] shadow-sm">
    <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 px-4 py-3">
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleBold().run())} aria-label="Bold"><b>B</b></button>
      <button className="editor-tool italic" onClick={toggle(() => editor.chain().focus().toggleItalic().run())} aria-label="Italic">I</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}>H2</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleBulletList().run())} aria-label="Bulleted list">• List</button>
      <button className="editor-tool" onClick={toggle(() => editor.chain().focus().toggleOrderedList().run())} aria-label="Numbered list">1. List</button>
      <span className="mx-1 h-5 border-l border-stone-200" />
      <select defaultValue={scene.status} onChange={(event) => { scene.status = event.target.value as SceneRecord['status'] }} className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600" aria-label="Scene status"><option value="draft">Draft</option><option value="published">Published</option></select>
      <div className="ml-auto flex gap-2"><button className="text-xs text-stone-400 hover:text-red-700" onClick={onDelete}>Delete</button><button className="rounded-full bg-stone-800 px-3 py-1.5 text-xs text-[#faf7f1]" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save scene'}</button></div>
    </div>
    <div className="p-5 sm:p-8"><input defaultValue={scene.title} onChange={(event) => { scene.title = event.target.value }} className="w-full border-0 bg-transparent font-serif text-3xl tracking-tight outline-none placeholder:text-stone-300 sm:text-4xl" aria-label="Scene title" /><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-400"><span>Continuity: {scene.continuityId}</span><span>Sequence: {scene.narrative.sequence}</span><span>Event date: {scene.fictionalEventDate ?? 'Unspecified'}</span></div><div className="mt-8"><EditorContent editor={editor} /></div></div>
  </section>
}

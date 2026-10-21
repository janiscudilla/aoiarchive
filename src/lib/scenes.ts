import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db, ownerUid } from './firebase'

export type SceneStatus = 'draft' | 'published'

export type SceneRecord = {
  id: string
  title: string
  content: Record<string, unknown>
  fictionalEventDate: string | null
  continuityId: string
  narrative: { sequence: number; arcId: string; pointOfView: string }
  status: SceneStatus
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}

export type SceneInput = Omit<SceneRecord, 'id' | 'createdAt' | 'updatedAt'>

const emptyContent = { type: 'doc', content: [{ type: 'paragraph' }] }

function assertReady() {
  if (!db || !ownerUid) throw new Error('Firebase is not configured for this archive.')
}

function scenesCollection() {
  assertReady()
  return collection(db!, 'archives', ownerUid, 'scenes')
}

function validate(input: SceneInput) {
  if (!input.title.trim()) throw new Error('A scene title is required.')
  if (!['draft', 'published'].includes(input.status)) throw new Error('Scene status must be draft or published.')
  if (!Number.isFinite(input.narrative.sequence)) throw new Error('Narrative sequence must be a number.')
  if (!input.continuityId.trim()) throw new Error('A continuity ID is required.')
}

function recordFromSnapshot(id: string, data: Record<string, unknown>): SceneRecord {
  return {
    id,
    title: typeof data.title === 'string' ? data.title : 'Untitled scene',
    content: typeof data.content === 'object' && data.content !== null ? data.content as Record<string, unknown> : emptyContent,
    fictionalEventDate: typeof data.fictionalEventDate === 'string' ? data.fictionalEventDate : null,
    continuityId: typeof data.continuityId === 'string' ? data.continuityId : 'default',
    narrative: typeof data.narrative === 'object' && data.narrative !== null
      ? data.narrative as SceneRecord['narrative']
      : { sequence: 0, arcId: '', pointOfView: '' },
    status: data.status === 'published' ? 'published' : 'draft',
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt : null,
  }
}

export function newSceneInput(): SceneInput {
  return { title: 'Untitled scene', content: emptyContent, fictionalEventDate: null, continuityId: 'default', narrative: { sequence: 0, arcId: '', pointOfView: '' }, status: 'draft' }
}

export async function createScene(input: SceneInput) {
  validate(input)
  const ref = doc(scenesCollection())
  await setDoc(ref, { ...input, id: ref.id, title: input.title.trim(), createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  return ref.id
}

export async function listScenes(): Promise<SceneRecord[]> {
  const snapshot = await getDocs(query(scenesCollection(), orderBy('narrative.sequence', 'asc')))
  return snapshot.docs.map((item) => recordFromSnapshot(item.id, item.data()))
}

export async function readScene(id: string): Promise<SceneRecord | null> {
  const snapshot = await getDoc(doc(scenesCollection(), id))
  return snapshot.exists() ? recordFromSnapshot(snapshot.id, snapshot.data()) : null
}

export async function updateScene(id: string, input: SceneInput) {
  validate(input)
  await updateDoc(doc(scenesCollection(), id), { ...input, title: input.title.trim(), updatedAt: serverTimestamp() })
}

export async function deleteScene(id: string) {
  await deleteDoc(doc(scenesCollection(), id))
}

// Intended for deterministic imports where a caller already owns a stable ID.
export async function createSceneWithId(id: string, input: SceneInput) {
  validate(input)
  await setDoc(doc(scenesCollection(), id), { ...input, id, title: input.title.trim(), createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

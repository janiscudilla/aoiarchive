import { readFile } from 'node:fs/promises'
import { after, before, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const ownerUid = 'rzbJ6am5rjQlfE9C2CvBioKWiV13'
const otherUid = 'a-different-authenticated-user'
let testEnvironment

function sceneRef(context) {
  return doc(context.firestore(), 'archives', ownerUid, 'scenes', 'rules-test-scene')
}

before(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: 'aoiarchive',
    firestore: { rules: await readFile('firestore.rules', 'utf8') },
  })
})

beforeEach(async () => {
  await testEnvironment.clearFirestore()
})

after(async () => {
  await testEnvironment.cleanup()
})

test('the authorized owner can create and read a scene', async () => {
  const owner = testEnvironment.authenticatedContext(ownerUid)
  await assertSucceeds(setDoc(sceneRef(owner), { title: 'Rules test', status: 'draft' }))
  await assertSucceeds(getDoc(sceneRef(owner)))
})

test('an unauthenticated visitor cannot read or write a scene', async () => {
  const visitor = testEnvironment.unauthenticatedContext()
  await assertFails(getDoc(sceneRef(visitor)))
  await assertFails(setDoc(sceneRef(visitor), { title: 'Denied' }))
})

test('an authenticated non-owner cannot read or write a scene', async () => {
  const nonOwner = testEnvironment.authenticatedContext(otherUid)
  await assertFails(getDoc(sceneRef(nonOwner)))
  await assertFails(setDoc(sceneRef(nonOwner), { title: 'Denied' }))
})

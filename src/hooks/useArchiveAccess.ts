import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured, ownerUid } from '../lib/firebase'

export type ArchiveAccess = 'setup' | 'loading' | 'signed-out' | 'owner' | 'unauthorized'

export function useArchiveAccess() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [access, setAccess] = useState<ArchiveAccess>(isFirebaseConfigured ? 'loading' : 'setup')

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setAccess(!nextUser ? 'signed-out' : nextUser.uid === ownerUid ? 'owner' : 'unauthorized')
    }, () => { setError('Authentication status could not be verified.'); setAccess('signed-out') })
  }, [])

  async function signIn() {
    if (!auth) return
    setError(null)
    try { await signInWithPopup(auth, googleProvider) } catch { setError('Google sign-in could not be completed. Check Firebase Authentication and authorized domains.') }
  }

  async function signOutUser() {
    if (!auth) return
    await signOut(auth)
  }

  return { access, user, error, signIn, signOutUser }
}

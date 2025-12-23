'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { rehydrateAuth, loginSuccess, logout } from '@/store/slices/authSlice'
import { useSession } from 'next-auth/react'

export default function AuthHydrator() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()

  useEffect(() => {
    const stored = localStorage.getItem('auth')

    if (stored) {
      dispatch(rehydrateAuth(JSON.parse(stored)))
    } else {
      dispatch(logout()) // mark hydrated even if no auth
    }
  }, [dispatch])

  // useEffect(() => {
  //   // Sync next-auth session into Redux/localStorage so UI relying on Redux updates
  //   if (status === 'authenticated' && session) {
  //     const user = session.user
  //     // accessToken may be available via session depending on callbacks; fallback to 'nextauth'
  //     const token = (session as any).accessToken ?? 'nextauth'
  //     const payload = { user, token }
  //     dispatch(loginSuccess(payload))
  //     localStorage.setItem('auth', JSON.stringify(payload))
  //   } else if (status === 'unauthenticated') {
  //     // Clear Redux and localStorage when session is unauthenticated
  //     dispatch(logout())
  //     localStorage.removeItem('auth')
  //   }
  // }, [status, session, dispatch])

  return null
}

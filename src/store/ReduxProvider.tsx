'use client'

import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store/store'
import { useEffect } from 'react'
import { rehydrateAuth } from '@/store/slices/authSlice'

function AuthRehydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      dispatch(rehydrateAuth(JSON.parse(saved)))
    }
  }, [dispatch])

  return <>{children}</>
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthRehydrator>{children}</AuthRehydrator>
    </Provider>
  )
}

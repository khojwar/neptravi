'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { rehydrateAuth } from '@/store/slices/authSlice'

export default function AuthHydrator() {
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      dispatch(rehydrateAuth(JSON.parse(auth)))
    }
  }, [dispatch])

  return null
}

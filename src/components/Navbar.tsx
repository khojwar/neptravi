'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { NavigationLinks } from './NavigationLinks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about')

  const dispatch = useDispatch()
  const router = useRouter()

  // ✅ Redux auth state
  const { token } = useSelector((state: RootState) => state.auth)
  const isAuthenticated = Boolean(token)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('auth')

    document.cookie = 'token=; path=/; max-age=0'
    toast.success('Logged out successfully')
    router.push('/signin')
  }

  return (
    <div className="flex justify-between items-center fixed top-4 left-0 right-0 z-50 text-white mx-4 md:max-w-3xl md:mx-auto lg:max-w-7xl">
      <h1 className="flex gap-2 font-bold">
        <span className="md:hidden">
          <MobileMenu />
        </span>
        NEPTRAVI
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-4 border-white border-t-2 bg-gray-600/50 bg-opacity-50 shadow-md rounded-4xl md:py-2 md:px-4 md:ml-16 lg:ml-20">
        <NavigationLinks
          activeSection={activeSection}
          onLinkClick={setActiveSection}
        />
      </ul>

      <div className="flex items-center gap-2">
        <LanguageToggle />

        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            variant="custom"
            className="hidden md:block"
          >
            Logout
          </Button>
        ) : (
          <Link href="/signin">
            <Button variant="custom" className="hidden md:block">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar

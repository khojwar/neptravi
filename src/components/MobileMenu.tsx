"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavigationLinks } from "./NavigationLinks";
import { Button } from "./ui/button";
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session, status } = useSession()
  const { token } = useSelector((state: RootState) => state.auth)
  const isAuthenticated = Boolean(token) || status === 'authenticated'

  const handleLogout = async () => {
    dispatch(logout())
    localStorage.removeItem('auth')
    document.cookie = 'token=; path=/; max-age=0'
    toast.success('Logged out successfully')
    setOpen(false)
    await signOut({ callbackUrl: '/signin' })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden ">
          <Menu className="h-6 w-6 cursor-pointer" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[350px] sm:w-[400px] mt-16 ml-2 bg-gray-600/90 text-white md:hidden">
        <nav className="flex flex-col gap-4 mt-2 px-8">
          <NavigationLinks
            onLinkClick={() => setOpen(false)} // close menu
          />
          {isAuthenticated ? (
            <Button variant='custom' className='w-full mt-4' onClick={handleLogout}>Logout</Button>
          ) : (
            <Link href="/signin" onClick={() => setOpen(false)}>
              <Button variant='custom' className='w-full mt-4'>Login</Button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

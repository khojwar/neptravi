import React from 'react'
import { Button } from './ui/button'
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <div className='flex flex-col py-16 bg-black text-white px-8 lg:px-32 text-sm my-16'>
        <div className='flex flex-col lg:flex-row gap-16 justify-between items-start'>
            <div className='flex justify-between w-full lg:w-1/2'>
                <div className='flex flex-col gap-8'>
                    <p className='text-lg'>About</p>
                    <div className='flex flex-col gap-8 text-gray-300/50'>
                        <p>About Us</p>
                        <p>Blog</p>
                        <p>Careers</p>
                        <p>Jobs</p>
                        <p>In Press</p>
                        <p>Gallery</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <p className='text-lg'>Support</p>
                    <div className='flex flex-col gap-8 text-gray-300/50'>
                        <p>Contack us</p>
                        <p>Online chat</p>
                        <p>Whatsapp</p>
                        <p>Telegram</p>
                        <p>Ticketing</p>
                        <p>Call Center</p>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <p className='text-lg'>FAQ</p>
                    <div className='flex flex-col gap-8 text-gray-300/50'>
                        <p>Account</p>
                        <p>Booking</p>
                        <p>Payments</p>
                        <p>Returns</p>
                        <p>Privacy policy</p>
                        <p>Terms & Condition</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-8 lg:w-1/2 text-gray-300/50'>
                <h1 className='text-lg text-white'>Newsletter</h1>
                <p>Don't miss out on the exciting world of travel - subscribe now and embark on a journey of discovery with us</p>
                <div className='text-white flex justify-between items-center p-2 rounded-4xl overflow-hidden px-2 shadow-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                    <div className='flex items-center gap-2 pl-4'>
                        <Mail /> Enter your email
                    </div> 
                    <Button>Subscribe</Button> 
                </div>
                <div className='flex justify-end pt-8 gap-4'>
                    <p className='flex justify-center items-center h-8 w-8 p-2 rounded-full bg-gray-300/50'><Instagram className='text-white' /></p>
                    <p className='flex justify-center items-center h-8 w-8 p-2 rounded-full bg-gray-300/50'><Facebook className='text-white' /></p>
                    <p className='flex justify-center items-center h-8 w-8 p-2 rounded-full bg-gray-300/50'><Youtube className='text-white' /></p>
                </div>
            </div>
        </div>
        <div className='pt-16'>
            <p className='text-center'>&copy; 2025 Neptravi, All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
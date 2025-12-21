import { Facebook, Instagram, Mail, Youtube } from 'lucide-react'
import Link from 'next/link';
import dynamic from 'next/dynamic';

const EmailSubscribe = dynamic(() => import('./EmailSubscribe'), { ssr: false });

const Footer = () => {

    const socialLinks = [
        { icon: <Instagram className='text-white' />, url: 'https://www.instagram.com' },
        { icon: <Facebook className='text-white' />, url: 'https://www.facebook.com' },
        { icon: <Youtube className='text-white' />, url: 'https://www.youtube.com' },
    ];


  return (
    <div id='contact' className='flex flex-col py-16 bg-black text-white px-4 md:px-8 lg:px-32 text-sm mt-16'>
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
            <div className='flex flex-col gap-8 lg:w-1/2 text-gray-300/50  '>
                <h1 className='text-lg text-white'>Newsletter</h1>
                <p>Don't miss out on the exciting world of travel - subscribe now and embark on a journey of discovery with us</p>
                <EmailSubscribe />
                <div className='flex justify-end pt-8 gap-4'>
                    {socialLinks.map((link, index) => (
                        <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className='flex justify-center items-center h-8 w-8 p-2 rounded-full bg-gray-300/50'>
                            {link.icon}
                        </Link>
                    ))}
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
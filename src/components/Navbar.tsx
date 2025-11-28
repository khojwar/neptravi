'use client';

import { useState } from 'react';
import { Button } from './ui/button'
import LanguageToggle from './LanguageToggle';
import { Menu } from 'lucide-react';


const Navbar = () => {

    const [activeSection, setActiveSection] = useState('about');

    const navItems = [
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'tour', label: 'Tour' },
      { id: 'blog', label: 'Blog' },
      { id: 'contact', label: 'Contact' }
    ];


  return (
        <div className='flex justify-between items-center fixed top-4 left-0 right-0 z-50 text-white mx-4  md:max-w-3xl md:mx-auto lg:max-w-7xl'>
            <h1 className='flex gap-2 font-bold'> <span className='md:hidden'> <Menu /> </span> NEPTRAVI</h1>
            <ul className='hidden md:flex gap-4  border-white border-t-2 bg-gray-600/50 bg-opacity-50 shadow-md rounded-4xl md:py-2 md:px-8 md:ml-16 lg:ml-20 '>
                {navItems.map((item) => (
                    <li 
                        key={item.id}
                        className={`cursor-pointer hover:text-white ${activeSection === item.id ? 'text-white' : 'text-gray-300'}`}
                        onClick={() => setActiveSection(item.id)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className='flex items-center gap-2'>
                <div> <LanguageToggle /> </div>
                <Button variant={'custom'} className='hidden md:block'>Login</Button>
            </div>
        </div>
  )
}

export default Navbar
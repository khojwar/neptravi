'use client';

import { useState } from 'react';
import { Button } from './ui/button'
import LanguageToggle from './LanguageToggle';


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
    <div className='flex justify-between items-center text-white'>
        <h1 className='font-bold'>NEPTRAVI</h1>
        <ul className='flex gap-4 md:ml-16 lg:ml-20 py-2 px-8 border-white border-t-2 bg-gray-600/50 bg-opacity-50 shadow-md rounded-4xl'>
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
            <Button variant={'custom'}>Login</Button>
        </div>
    </div>
  )
}

export default Navbar
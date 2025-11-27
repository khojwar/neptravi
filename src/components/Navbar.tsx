'use client';

import { useState } from 'react';
import { Button } from './ui/button'


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
    <div className='flex justify-between items-center mx-8 my-4 text-white'>
        <h1 className='font-bold'>INDOTRAVI</h1>
        <ul className='flex gap-8 py-2 px-8 border-white border-t-2 bg-gray-600/50 bg-opacity-50 shadow-md rounded-4xl'>
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
        <div className='flex items-center gap-8'>
            <div>De En</div>
            <Button variant={'custom'}>Login</Button>
        </div>
    </div>
  )
}

export default Navbar
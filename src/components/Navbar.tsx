'use client';

import { Button } from './ui/button'


const Navbar = () => {


  return (
    <div className='flex justify-between items-center mx-8 my-4 text-white'>
        <h1 className='font-bold'>INDOTRAVI</h1>
        <ul className='flex gap-8 py-2 px-8 border-white border-t-2 bg-gray-600/30 bg-opacity-50 shadow-md rounded-4xl'>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#tour">Tour</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div className='flex items-center gap-8'>
            <div>De En</div>
            <Button variant={'custom'}>Login</Button>
        </div>
    </div>
  )
}

export default Navbar
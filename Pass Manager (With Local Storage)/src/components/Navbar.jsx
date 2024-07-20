import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-200'>
      <div className='newcontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className="logo font-bold text-black text-2xl">
          <span className='text-blue-600'>&lt;</span>
          Pass
          <span className='text-blue-600'>Manager/&gt;</span>
        </div>
        <ul className='flex items-center justify-end gap-6'>
          <li className='md:flex gap-4 hidden'>
            <a href="/" className='hover:font-bold'>Home</a>
            <a href="#" className='hover:font-bold'>About</a>
            <a href="#" className='hover:font-bold'>Contact</a>
          </li>
          <button className='flex justify-between items-center bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 rounded-full gap-1 ring-1 ring-black'>
            <img src="icons/github.svg" className='w-8 invert' alt="github logo" />
            <span className='font-bold'>GitHub</span>
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

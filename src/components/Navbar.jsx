import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-800 text-white py-3'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
        <ul className="flex gap-10 mx-9">
            <li className='cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-900'>Home</li>
            <li className='cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-900'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
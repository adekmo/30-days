import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow flex space-x-6">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/about" className="hover:underline">About</Link>
      <Link href="/contact" className='hover:underline'>Contact</Link>
    </nav>
  )
}

export default Navbar
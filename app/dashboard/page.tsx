'use client'

import Button from '@/components/Button'
import Cards from '@/components/Cards'
// import Dashboard from '@/layouts/Dashboard'
import React from 'react'
// import DashboardLayout from './layout'

import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const DashboardPage = () => {

  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>; // Tampilkan loading jika session belum tersedia
  }
  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Halaman Dashboard</h1>
        <div>
          <h1>Welcome, {session.user?.name}</h1>
          <p>Email: {session.user?.email}</p>
          <img src={session.user?.image as string} alt="Profile" width={50} height={50} />
        </div>

        <button
          onClick={() => signOut({ callbackUrl: '/' })} // Arahkan ke halaman utama setelah logout
          className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Sign out
        </button>
    </div>
  )
}

export default DashboardPage
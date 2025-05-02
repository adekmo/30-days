'use client'

import React, { useState } from 'react'

const Profile = () => {

    const [name, setName] = useState('John Doe')
    const [email, setEmail] = useState('john@example.com')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`Data disimpan:\nNama: ${name}\nEmail: ${email}`)
      }
  return (
    <div>
      <div>
      <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
    </div>
  )
}

export default Profile
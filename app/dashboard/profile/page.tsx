'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [image, setImage] = useState(session?.user?.image || '')
  const router = useRouter()

  // Fungsi untuk menangani pengiriman data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('📦 Data yang dikirim:', { name, image }) // Cek data yang dikirim

    // Kirim data ke API untuk memperbarui profil
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image }),
    })

    if (res.ok) {
      await update() // update session di sisi client
      router.refresh() // refresh halaman
      console.log("✅ Profil berhasil diperbarui dan session diperbarui")
    } else {
      console.log("❌ Error saat memperbarui profil", res.statusText)
    }
  }

  if (!session) return <p>Kamu belum login...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Foto (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  )
}

export default Profile

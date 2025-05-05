import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import clientPromise from '@/lib/mongodb'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Cek jika session tidak ada atau email tidak ditemukan
    if (!session || !session.user?.email) {
      console.log('❌ No session or email found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ambil data dari request body
    const { name, image } = await req.json()

    // Cek data yang diterima
    console.log('✅ Updating profile for:', session.user.email)
    console.log('📦 New data:', { name, image })

    // Koneksi ke database
    const client = await clientPromise
    const db = client.db('30days-db')

    // Update data user di MongoDB
    const result = await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { name, image } }
    )

    // Cek hasil update
    console.log('✅ Update result:', result)

    return NextResponse.json({ message: 'Profile updated', result })
  } catch (error) {
    console.error('❌ Error updating profile:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

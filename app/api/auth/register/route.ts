import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('30days-db');
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      image: null,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Registrasi berhasil' }, { status: 201 });

  } catch (error) {
    console.error('❌ Error saat registrasi:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan di server' }, { status: 500 });
  }
}

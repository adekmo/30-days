import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const client = await clientPromise;
      const db = client.db('30days-db');
  
      const recipes = await db
        .collection('recipes')
        .find({ userEmail: session.user.email })
        .sort({ createdAt: -1 })
        .toArray();
  
      return NextResponse.json(recipes);
    } catch (error) {
      console.error('❌ Gagal mengambil resep:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, ingredients, instructions } = body;

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('30days-db');

    const newRecipe = {
      userEmail: session.user.email,
      title,
      ingredients,
      instructions,
      createdAt: new Date(),
    };

    await db.collection('recipes').insertOne(newRecipe);

    return NextResponse.json({ message: 'Resep berhasil disimpan' });
  } catch (error) {
    console.error('❌ Error saat menyimpan resep:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

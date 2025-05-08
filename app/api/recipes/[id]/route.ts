// app/api/recipes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('30days-db');

    const recipe = await db.collection('recipes').findOne({
      _id: new ObjectId(params.id),
      userEmail: session.user.email,
    });

    if (!recipe) {
      return NextResponse.json({ message: 'Resep tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('❌ Gagal mengambil resep:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const recipeId = params.id;
  const { title, ingredients, instructions } = await req.json();

  if (!title || !ingredients || !instructions) {
    return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('30days-db');

    const result = await db.collection('recipes').updateOne(
      { _id: new ObjectId(recipeId), userEmail: session.user.email },
      { $set: { title, ingredients, instructions, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Resep tidak ditemukan atau bukan milik Anda' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Resep berhasil diperbarui' });
  } catch (error) {
    console.error('❌ Gagal update resep:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const recipeId = params.id;

  try {
    const client = await clientPromise;
    const db = client.db('30days-db');

    const result = await db.collection('recipes').deleteOne({
      _id: new ObjectId(recipeId),
      userEmail: session.user.email, // pastikan hanya pemilik bisa hapus
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Resep tidak ditemukan atau bukan milik Anda' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Resep berhasil dihapus' });
  } catch (error) {
    console.error('❌ Gagal menghapus resep:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

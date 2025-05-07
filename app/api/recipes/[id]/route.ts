// app/api/recipes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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

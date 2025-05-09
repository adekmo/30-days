import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { isFavorite } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db('30days-db');

    const result = await db.collection('recipes').updateOne(
      { _id: new ObjectId(id), userEmail: session.user.email },
      { $set: { isFavorite } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Resep tidak ditemukan atau tidak diubah' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status favorit diperbarui' });
  } catch (error) {
    console.error('❌ Gagal update favorit:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// app/api/admin/recipes/[id]/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("30days-db");

  const result = await db.collection("recipes").deleteOne({ _id: new ObjectId(params.id) });

  if (result.deletedCount === 1) {
    return new NextResponse("Resep berhasil dihapus", { status: 200 });
  } else {
    return new NextResponse("Resep tidak ditemukan", { status: 404 });
  }
}

// app/api/admin/users/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("30days-db");

  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } }) // Jangan tampilkan password
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(users);
}

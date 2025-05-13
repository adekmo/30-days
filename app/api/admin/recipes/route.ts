// app/api/admin/recipes/route.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("30days-db");
  const recipes = await db.collection("recipes").find().toArray();

  return NextResponse.json(recipes);
}

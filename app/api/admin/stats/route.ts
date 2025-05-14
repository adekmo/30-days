// app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== 'admin') {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('30days-db');

  const recipes = await db.collection('recipes').aggregate([
    {
      $group: {
        _id: "$userEmail",
        totalRecipes: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "user"
      }
    },
    {
      $addFields: {
        name: {
          $cond: [
            { $gt: [{ $size: "$user" }, 0] },
            { $arrayElemAt: ["$user.name", 0] },
            "Unknown"
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        totalRecipes: 1
      }
    }
  ]).toArray();

  return NextResponse.json(recipes);
}

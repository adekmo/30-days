// app/api/auth/[...nextauth]/route.ts
import NextAuth, { User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import type { Session } from "next-auth";
import { MongoClient } from 'mongodb';
import clientPromise from "@/lib/mongodb"; 

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error("❌ MONGODB_URI is not defined in .env.local");
// }

// const client = new MongoClient(uri);

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user } : {user: User}) {
      try {
        const client = await clientPromise;
        const db = client.db("30days-db");
        const users = db.collection("users");
  
        const existingUser = await users.findOne({ email: user.email });
  
        if (!existingUser) {
          await users.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
          });
        }
        console.log("✅ User berhasil ditambahkan ke MongoDB:", user.email);
        return true; // ✅ Izinkan login
      } catch (error) {
        console.error("❌ Error in signIn callback:", error);
        return true; // ✅ Sementara izinkan login walau error, untuk debugging
      }
    },
    async session({ session } : {session : Session}) {
      try {
        const client = await clientPromise;
        const db = client.db("30days-db");
        const user = await db.collection("users").findOne({ email: session.user.email });

        if (user) {
          session.user.name = user.name;
          session.user.image = user.image;
        }

        return session;
      } catch (error) {
        console.error("❌ Error in session callback:", error);
        return session;
      }
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
        // Mengarahkan pengguna ke halaman dashboard setelah login
        return baseUrl + "/dashboard";
      },
  },
  pages: {
    signIn: '/auth/signin', // jika ingin menyesuaikan halaman login
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const // Gunakan string literal 'jwt' langsung
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

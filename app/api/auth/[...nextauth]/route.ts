// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import type { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // Credentials Provider (email & password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        const client = await clientPromise;
        const db = client.db("30days-db");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Email tidak terdaftar.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Password salah.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  callbacks: {
    // Untuk GitHub login (karena tidak pakai authorize)
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("30days-db");
        const users = db.collection("users");

        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
          // Hanya berlaku untuk GitHub login
          await users.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
          });
        }

        return true;
      } catch (error) {
        console.error("❌ signIn callback error:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const client = await clientPromise;
        const db = client.db("30days-db");
        const user = await db.collection("users").findOne({ email: session.user.email });

        if (user) {
          session.user.name = user.name;
          session.user.image = user.image;
          session.user.id = user._id.toString();
        }

        return session;
      } catch (error) {
        console.error("❌ session callback error:", error);
        return session;
      }
    },

    async redirect({ baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import React from 'react'

const DashboardPage = async () => {
  // Ambil session di server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    // Jika tidak ada session, arahkan ke halaman login
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Halaman Dashboard</h1>
      <div>
        <h1>Welcome, {session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
        <img
          src={session.user?.image as string}
          alt="Profile"
          width={50}
          height={50}
        />
      </div>

      {/* Formulir untuk logout */}
      <form action="/api/auth/signout" method="post">
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;

"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminPage = () => {

    const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Selamat datang, {session?.user?.name} (Role: {session?.user?.role})</p>
      <p>Di halaman ini kamu bisa melihat semua resep dari semua user.</p>

      <div className="p-2 flex">
        <button className="bg-blue-500 p-2 m-2 rounded-md">
          <Link href={`/admin/recipes`} className="text-slate-200 hover:underline mr-2">
              All Recipes
          </Link>
        </button>
        <button className="bg-blue-500 p-2 m-2 rounded-md">
          <Link href={`/admin/users`} className="text-slate-200 hover:underline mr-2">
              All Users
          </Link>
        </button>
        <button className="bg-blue-500 p-2 m-2 rounded-md">
          <Link href={`/admin/stats`} className="text-slate-200 hover:underline mr-2">
              Stats
          </Link>
        </button>
      </div>
      {/* nanti kita tambahkan list resep semua user */}
    </div>
  )
}

export default AdminPage
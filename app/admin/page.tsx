"use client";
import { useSession } from "next-auth/react";

const AdminPage = () => {

    const { data: session } = useSession();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Selamat datang, {session?.user?.name} (Role: {session?.user?.role})</p>
      <p>Di halaman ini kamu bisa melihat semua resep dari semua user.</p>
      {/* nanti kita tambahkan list resep semua user */}
    </div>
  )
}

export default AdminPage
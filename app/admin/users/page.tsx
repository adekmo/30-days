"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  createdAt?: string;
};

const AdminUsersPage = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
            const data = await res.json();
            setUsers(data);
        }
        };

        if (session?.user.role === "admin") {
        fetchUsers();
        }
    }, [session]);

    const handleDelete = async (id: string) => {
      const confirm = window.confirm("Yakin ingin menghapus user ini?");
      if (!confirm) return;

        const res = await fetch(`/api/admin/users/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
        setUsers((prev) => prev.filter((r) => r._id !== id));
        } else {
        alert("Gagal menghapus user.");
        }
    };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">👥 Daftar Semua User</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-2 py-2">
                  <button
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    ❌ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsersPage
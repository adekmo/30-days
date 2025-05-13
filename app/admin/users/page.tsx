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
              <th className="px-4 py-2">Terdaftar</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsersPage
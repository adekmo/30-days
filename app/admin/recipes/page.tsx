"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Recipe = {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  image?: string;
  userId?: string;
};

const AdminRecipePage = () => {
    const { data: session } = useSession();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
      const fetchRecipes = async () => {
        const res = await fetch("/api/admin/recipes");
        if (res.ok) {
            const data = await res.json();
            setRecipes(data);
        }
        };

        if (session?.user.role === "admin") {
            fetchRecipes();
        }
    }, [session])

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Yakin ingin menghapus resep ini?");
        if (!confirmed) return;

        const res = await fetch(`/api/admin/recipes/${id}`, {
        method: "DELETE",
        });

        if (res.ok) {
        setRecipes((prev) => prev.filter((r) => r._id !== id));
        } else {
        alert("Gagal menghapus resep.");
        }
    };
    
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📋 Semua Resep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="border p-4 rounded shadow">
            {recipe.image && (
              <Image src={recipe.image} alt={recipe.title} width={400} height={200} className="rounded" />
            )}
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-600">{recipe.ingredients}</p>
            <p className="text-sm text-gray-600">{recipe.instructions}</p>
            <button
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => handleDelete(recipe._id)}
            >
              ❌ Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminRecipePage
"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import ImageUpload from "@/components/ImageUpload";
import { CldUploadWidget } from "next-cloudinary";

const AddRecipes = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const handleUpload = (result: any) => {
      console.log("📦 Upload result:", result); // Debug log
    if (result?.info?.secure_url) {
      setImage(result.info.secure_url);
      console.log("✅ Gambar berhasil diset:", result.info.secure_url);
    } else {
      alert("Gagal mendapatkan URL gambar dari Cloudinary.");
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(" Data yang dikirim:", {
        //   title,
        //   ingredients: ingredients.split("\n"),
        //   instructions,
        //   image,
        // });
        // console.log("Cloudinary env:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);


        if (!image) {
          alert("Harap upload gambar terlebih dahulu.");
          return;
        }
    
        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            ingredients: ingredients.split("\n"), // input textarea ke array
            instructions,
            image,
          }),
        });
    
        if (res.ok) {
          router.push("/recipes");
        } else {
          alert("Gagal menambah resep");
        }
      };

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        router.push("/auth/signin");
        return null;
    }

  return (
    <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
            Tambah Resep
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            placeholder="Judul Resep"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
            />
            <textarea
            placeholder="Bahan-bahan (1 baris 1 bahan)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
            required
            className="w-full p-2 border rounded"
            />
            <textarea
            placeholder="Petunjuk memasak"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={5}
            required
            className="w-full p-2 border rounded"
            />

            <CldUploadWidget
              uploadPreset="recipe_upload" // <- preset yang kamu buat
              onSuccess={handleUpload}
            >
              {({ open }) => (
                <button
                  onClick={() => open?.()}
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Upload Gambar
                </button>
              )}
            </CldUploadWidget>

            {image && (
              <div className="mt-4">
                <p>Preview Gambar:</p>
                <img src={image} alt="Preview" className="w-64 rounded shadow" />
              </div>
            )}

            <button
            type="submit"
            disabled={!image}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
            Simpan Resep
            </button>
        </form>
    </div>
  )
}

export default AddRecipes
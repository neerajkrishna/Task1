"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ImageUploader from "../components/ImageUploader";
import { USER_ID } from "../constants";

export default function Page() {
  const queryClient = useQueryClient();
  const [viewImage, setViewImage] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch(`/api/images?userId=${USER_ID}`);
      if (!res.ok) throw new Error("Failed to fetch images");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (key: string) => {
      await fetch(`/api/images`, {
        method: "DELETE",
        body: JSON.stringify({ key }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Image Upload App</h1>

      <div className="w-full max-w-md mb-10">
        <ImageUploader onUpload={() => queryClient.invalidateQueries({ queryKey: ["images"] })} />
      </div>

      <div className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Uploaded Images</h2>

        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : isError ? (
          <p className="text-red-600">Failed to load images.</p>
        ) : Array.isArray(data) && data.length === 0 ? (
          <p className="text-gray-500 italic">No images found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {data.map((img: { url: string; key: string }) => (
              <div
                key={img.key}
                className="relative bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <img
                  src={img.url}
                  alt="Uploaded"
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setViewImage(img.url)}
                />
                <button
                  onClick={() => deleteMutation.mutate(img.key)}
                  disabled={deleteMutation.isPending}
                  className="absolute top-2 right-2 bg-black text-white p-2 rounded-full hover:bg-white hover:text-black border border-black transition-all disabled:opacity-50"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setViewImage(null)}
        >
          <img
            src={viewImage}
            alt="Enlarged"
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg border border-white"
          />
        </div>
      )}
    </div>
  );
}

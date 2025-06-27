"use client";

import ImageUploader from "../components/ImageUploader";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { USER_ID } from "../constants";

function ImagesView() {
  const [viewImage, setViewImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["images", USER_ID],
    queryFn: async () => {
      const res = await fetch(`/api/images?userId=${USER_ID}`);
      const data = await res.json();
      return data.images || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (key: string) => {
      await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images", USER_ID] });
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Images</h1>
      <ImageUploader
        onUpload={() =>
          queryClient.invalidateQueries({ queryKey: ["images", USER_ID] })
        }
      />
      <h2 className="text-2xl font-semibold mt-8 mb-4">All Uploaded Images</h2>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      <div className="flex flex-wrap gap-4">
        {data?.map((img: { url: string; key: string }) => (
          <div key={img.key} className="flex flex-col items-center">
            <img
              src={img.url}
              alt="Uploaded"
              className="max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setViewImage(img.url)}
            />
            <button
              onClick={() => deleteMutation.mutate(img.key)}
              disabled={deleteMutation.isPending}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {viewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setViewImage(null)}
        >
          <img
            src={viewImage}
            alt="Enlarged"
            className="max-h-[90vh] max-w-[90vw] bg-white object-contain"
          />
        </div>
      )}
    </div>
  );
}

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImagesView />
    </QueryClientProvider>
  );
}

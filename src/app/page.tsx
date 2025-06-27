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
    <div style={{ padding: 32 }}>
      <h1>User Images</h1>
      <ImageUploader
        onUpload={() =>
          queryClient.invalidateQueries({ queryKey: ["images", USER_ID] })
        }
      />
      <h2>All Uploaded Images</h2>
      {isLoading && <p>Loading...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {data?.map((img: { url: string; key: string }) => (
          <div
            key={img.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={img.url}
              alt="Uploaded"
              style={{ maxWidth: 200, cursor: "pointer" }}
              onClick={() => setViewImage(img.url)}
            />
            <button
              onClick={() => deleteMutation.mutate(img.key)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {viewImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setViewImage(null)}
        >
          <img
            src={viewImage}
            alt="Enlarged"
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              background: "white",
            }}
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

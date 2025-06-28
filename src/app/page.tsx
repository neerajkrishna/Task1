// "use client";

// import ImageUploader from "../components/ImageUploader";
// import { useState } from "react";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { USER_ID } from "../constants";

// function ImagesView() {
//   const [viewImage, setViewImage] = useState<string | null>(null);
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["images", USER_ID],
//     queryFn: async () => {
//       const res = await fetch(`/api/images?userId=${USER_ID}`);
//       const data = await res.json();
//       return data.images || [];
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (key: string) => {
//       await fetch("/api/images", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ key }),
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["images", USER_ID] });
//     },
//   });

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">User Images</h1>
//       <ImageUploader
//         onUpload={() =>
//           queryClient.invalidateQueries({ queryKey: ["images", USER_ID] })
//         }
//       />
//       <h2 className="text-2xl font-semibold mt-8 mb-4">All Uploaded Images</h2>
//       {isLoading && <p className="text-gray-600">Loading...</p>}
//       <div className="flex flex-wrap gap-4">
//         {data?.map((img: { url: string; key: string }) => (
//           <div key={img.key} className="flex flex-col items-center">
//             <img
//               src={img.url}
//               alt="Uploaded"
//               className="max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
//               onClick={() => setViewImage(img.url)}
//             />
//             <button
//               onClick={() => deleteMutation.mutate(img.key)}
//               disabled={deleteMutation.isPending}
//               className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       {viewImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//           onClick={() => setViewImage(null)}
//         >
//           <img
//             src={viewImage}
//             alt="Enlarged"
//             className="max-h-[90vh] max-w-[90vw] bg-white object-contain"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// const queryClient = new QueryClient();

// export default function HomePage() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ImagesView />
//     </QueryClientProvider>
//   );
// }
"use client";

import ImageUploader from "../components//ImageUploader";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const queryClient = useQueryClient();
  const [viewImage, setViewImage] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (key: string) => {
      await fetch(`/api/images?key=${key}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Image Upload App</h1>

      <div className="mb-10">
        <ImageUploader onUpload={() => queryClient.invalidateQueries({ queryKey: ["images"] })} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Uploaded Images</h2>

      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : data?.length === 0 ? (
        <p className="text-gray-500 italic">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((img: { url: string; key: string }) => (
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
                className="absolute top-2 right-2 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-all disabled:opacity-50"
                title="Delete Image"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

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

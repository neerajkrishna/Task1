import { useState } from "react";
import { USER_ID } from "../constants";

interface ImageUploaderProps {
  onUpload?: () => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", USER_ID);
    await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (onUpload) onUpload();
  }

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {loading && <p className="text-gray-600 mt-2">Loading...</p>}
    </div>
  );
}

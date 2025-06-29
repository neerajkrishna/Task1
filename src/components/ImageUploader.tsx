import { useState } from "react";
import { USER_ID } from "../constants";

interface ImageUploaderProps {
  onUpload?: () => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    setPreview(URL.createObjectURL(file));

    // Upload
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", USER_ID);

    await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    setPreview(null);
    if (onUpload) onUpload();
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>

      <label className="cursor-pointer block">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={loading}
          className="hidden"
        />
        <div className="w-full border border-dashed border-gray-400 p-4 rounded-lg text-center text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50 transition-all">
          Click to choose an image
        </div>
      </label>

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="rounded-md w-full h-auto border"
          />
        </div>
      )}

      {loading && (
        <p className="text-blue-600 mt-4 font-medium">Uploading...</p>
      )}
    </div>
  );
}

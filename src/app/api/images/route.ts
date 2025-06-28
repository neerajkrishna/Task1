import { NextRequest } from "next/server";
import { put, list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";

// Upload image
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;
  if (!file || !userId) {
    return new Response(
      JSON.stringify({ error: "No file or userId provided" }),
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `user/${userId}/${Date.now()}-${file.name}`;

  const blob = await put(fileName, buffer, { access: "public" });

  return new Response(JSON.stringify({ url: blob.url, key: blob.pathname }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// List images
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ error: "No userId provided" }), {
      status: 400,
    });
  }

  const prefix = `user/${userId}/`;
  const blobs = await list({ prefix });
  const images = blobs.blobs.map((blob) => ({
    url: blob.url,
    key: blob.pathname,
  }));
  return new Response(JSON.stringify(images), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Delete image
export async function DELETE(request: Request) {
  const { key } = await request.json();
  if (!key) {
    return new Response(JSON.stringify({ error: "No key provided" }), {
      status: 400,
    });
  }

  await del(key);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const filePath = path.join("/");
  const encodedPath = path
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  try {
    const targetUrl = `${API_URL}/uploads/${encodedPath}`;
    const res = await fetch(targetUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(
        `[Image Proxy] Failed to fetch image: ${targetUrl} (Status: ${res.status})`
      );
      return new NextResponse(null, { status: res.status });
    }

    const blob = await res.blob();
    const contentType = res.headers.get("Content-Type");

    if (contentType && !contentType.startsWith("image/")) {
      console.warn(
        `[Image Proxy] Decoded content is not an image: ${contentType} for ${targetUrl}`
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", contentType || "image/jpeg");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`[Image Proxy] Error fetching ${filePath}:`, error);
    return new NextResponse(null, { status: 500 });
  }
}

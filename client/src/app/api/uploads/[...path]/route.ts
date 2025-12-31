import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const filePath = path.join("/");

  try {
    const res = await fetch(`${API_URL}/uploads/${filePath}`);

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const blob = await res.blob();
    const headers = new Headers();
    headers.set(
      "Content-Type",
      res.headers.get("Content-Type") || "image/jpeg"
    );
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse(null, { status: 500 });
  }
}

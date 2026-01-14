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
    console.log(`[Image Proxy] Fetching from: ${targetUrl}`);

    const res = await fetch(targetUrl);

    if (!res.ok) {
      console.error(
        `[Image Proxy] Backend error: ${res.status} for ${targetUrl}`
      );
      return new NextResponse(null, { status: res.status });
    }

    const blob = await res.blob();
    const contentType = res.headers.get("Content-Type") || "image/jpeg";

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`[Image Proxy] Catch error:`, error);
    return new NextResponse(null, { status: 500 });
  }
}

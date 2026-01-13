import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js Blogs GET Proxy error:", error);
    return NextResponse.json(
      { message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js Blogs POST Proxy error:", error);
    return NextResponse.json(
      { message: "Error creating blog" },
      { status: 500 }
    );
  }
}

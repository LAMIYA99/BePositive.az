import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/faqs`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend FAQ fetch failed:", data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js FAQ GET Proxy error:", error);
    return NextResponse.json(
      { message: "Error fetching FAQS" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error("Failed to parse request JSON:", e);
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    if (!body) {
      return NextResponse.json(
        { message: "Body is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/api/faqs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend FAQ creation failed:", data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js FAQ POST Proxy error:", error);
    return NextResponse.json(
      { message: "Error creating FAQ" },
      { status: 500 }
    );
  }
}

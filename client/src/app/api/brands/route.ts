import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { revalidateTag } from "next/cache";

const CACHE_TAG = "brands";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/brands`, {
      cache: "no-store",
    });

    if (!res.ok) return NextResponse.json([], { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching brands proxy:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/api/brands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // @ts-ignore
      revalidateTag(CACHE_TAG);
      const data = await res.json();
      return NextResponse.json(data, { status: 201 });
    }
    return NextResponse.json(
      { error: "Backend Error" },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error creating brand proxy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

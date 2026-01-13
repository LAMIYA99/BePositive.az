import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/notifications/active`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Next.js Active Notification Proxy error:", error);
    return NextResponse.json(null, { status: 500 });
  }
}

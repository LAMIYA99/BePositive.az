import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/faqs`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching FAQS" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/api/faqs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating FAQ" },
      { status: 500 }
    );
  }
}

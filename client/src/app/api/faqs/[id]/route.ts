import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/api/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`Backend FAQ PUT failed for ${id}:`, data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Next.js FAQ PUT Proxy error for ${id}:`, error);
    return NextResponse.json(
      { message: "Error updating FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/api/faqs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`Backend FAQ DELETE failed for ${id}:`, data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Next.js FAQ DELETE Proxy error for ${id}:`, error);
    return NextResponse.json(
      { message: "Error deleting FAQ" },
      { status: 500 }
    );
  }
}

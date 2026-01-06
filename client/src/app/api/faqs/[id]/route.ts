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
    return NextResponse.json(data);
  } catch (error) {
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
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting FAQ" },
      { status: 500 }
    );
  }
}

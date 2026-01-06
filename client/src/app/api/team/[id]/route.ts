import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const res = await fetch(`${API_URL}/api/team/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Backend Error" },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error updating team member proxy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${API_URL}/api/team/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return NextResponse.json({ message: "Deleted" });
    }
    return NextResponse.json(
      { error: "Backend Error" },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error deleting team member proxy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

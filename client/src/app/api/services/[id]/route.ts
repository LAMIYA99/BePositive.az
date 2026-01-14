import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";
import { revalidateTag } from "next/cache";

const CACHE_TAG = "services";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const res = await fetch(`${API_URL}/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      // @ts-ignore
      revalidateTag(CACHE_TAG);
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Backend Error" },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error updating service proxy:", error);
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
    const res = await fetch(`${API_URL}/api/services/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // @ts-ignore
      revalidateTag(CACHE_TAG);
      const data = await res.json();
      return NextResponse.json(data);
    }
    return NextResponse.json(
      { error: "Backend Error" },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error deleting service proxy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

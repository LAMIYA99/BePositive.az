import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Next.js Blog ${id} GET Proxy error:`, error);
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Next.js Blog ${id} PUT Proxy error:`, error);
    return NextResponse.json(
      { message: "Error updating blog" },
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
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Next.js Blog ${id} DELETE Proxy error:`, error);
    return NextResponse.json(
      { message: "Error deleting blog" },
      { status: 500 }
    );
  }
}

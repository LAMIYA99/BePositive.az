const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
export const API_URL = rawUrl.trim().replace(/\/$/, "");
export const UPLOADS_URL = `${API_URL}/uploads`;

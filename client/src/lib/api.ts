const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.bepositive.az";
export const API_URL = rawUrl.trim().replace(/\/$/, "");
export const UPLOADS_URL = `${API_URL}/uploads`;

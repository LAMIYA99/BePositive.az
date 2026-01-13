const getApiUrl = () => {
  // Sunucu tarafında (Proxy rotalarında) her zaman yerel backend'e (5001) bağlan.
  // Bu, VPS içindeki 500 hatalarını ve SSL problemlerini çözer.
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://127.0.0.1:5001";
  }

  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  const hostname = window.location.hostname;

  if (hostname === "bepositive.az" || hostname === "www.bepositive.az") {
    return "https://api.bepositive.az";
  }

  return envUrl || "https://api.bepositive.az";
};

export const API_URL = getApiUrl().trim().replace(/\/$/, "");
export const UPLOADS_URL = `${API_URL}/uploads`;

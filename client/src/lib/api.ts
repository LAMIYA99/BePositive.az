const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "bepositive.az" || hostname === "www.bepositive.az") {
      return "https://api.bepositive.az";
    }
  }

  return envUrl || "https://api.bepositive.az";
  
};

export const API_URL = getApiUrl().trim().replace(/\/$/, "");
export const UPLOADS_URL = `${API_URL}/uploads`;

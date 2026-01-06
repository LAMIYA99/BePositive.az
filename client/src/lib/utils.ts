import { API_URL } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "/placeholder.svg";

  // List of known static images in public folder to serve locally
  // This bypasses the backend for these specific files, fixing Render ephemeral storage issues
  const localImages = [
    "seminar.png",
    "adstraining.png",
    "smmtraining.jpg",
    "branding.png",
    "marketing.png",
    "studio.png",
    "videoshoot.png",
    "ads.png",
    "clife.png",
    "Logo.png",
    "LogoFooter.png",
    "Aze.png",
    "en.png",
    "FlagAzerbaijan.png",
  ];

  // Check if the path contains any of the local images
  const foundLocal = localImages.find((img) =>
    path.toLowerCase().includes(img.toLowerCase())
  );

  if (foundLocal) {
    return `/${foundLocal}`;
  }

  // Normalize path: replace backslashes with forward slashes
  let cleanPath = path.replace(/\\/g, "/");

  // If it's already an external link, return as is
  if (cleanPath.startsWith("http")) return cleanPath;

  // Ensure it starts with / for relative paths
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  // Determine the base URL
  let baseUrl = API_URL;

  // Special handling for local development with mobile devices
  // We use the relative /api proxy only when on localhost to avoid IP issues
  if (cleanPath.startsWith("/uploads/")) {
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (isLocalhost) {
      baseUrl = "/api";
    }
  }

  // Encode the path part to handle spaces and special characters
  // We use encodeURI to keep slashes intact
  const encodedPath = encodeURI(cleanPath);

  return `${baseUrl}${encodedPath}`;
}

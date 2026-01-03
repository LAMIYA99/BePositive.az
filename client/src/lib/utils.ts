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
  const foundLocal = localImages.find((img) => path.includes(img));
  if (foundLocal) {
    return `/${foundLocal}`;
  }

  // Normalize path: replace backslashes with forward slashes
  let cleanPath = path.replace(/\\/g, "/");

  // If it's already an external https link (or http), return it
  if (cleanPath.startsWith("http")) return cleanPath;

  // Add leading slash if missing
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  // If it's from the uploads folder, use the relative api proxy
  // This allows mobile devices on the same network to see images
  // without needing to know the server's IP address.
  if (cleanPath.startsWith("/uploads/")) {
    return `/api${cleanPath}`;
  }

  // Prepend API_URL for other uploaded files (if any)
  // or return as is if it's already a relative path for public folder
  return `${API_URL}${cleanPath}`;
}

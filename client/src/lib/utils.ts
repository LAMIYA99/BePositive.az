import { API_URL } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "/placeholder.svg";

  // Normalize path: replace backslashes with forward slashes
  let cleanPath = path.replace(/\\/g, "/");

  // 1. If it's already an external link (Cloudinary or others), return as is
  if (cleanPath.startsWith("http")) return cleanPath;

  // 2. Handle uploaded files (Legacy local uploads)
  // We check if "uploads/" is in the string.
  if (cleanPath.includes("uploads/")) {
    const uploadIndex = cleanPath.indexOf("uploads/");
    const fileName = cleanPath.substring(uploadIndex + "uploads/".length);
    // Use the relative proxy for local uploads
    return `/api/uploads/${encodeURI(fileName)}`;
  }

  // 3. Handle local public files (Logo, Banner, etc.)
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  return cleanPath;
}

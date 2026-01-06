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

  // If it's already an external link, return as is
  if (cleanPath.startsWith("http")) return cleanPath;

  // 1. Handle uploaded files
  // We check if "uploads/" is in the string.
  // This handles both "/uploads/img.jpg" and "uploads/img.jpg"
  if (cleanPath.includes("uploads/")) {
    const uploadIndex = cleanPath.indexOf("uploads/");
    // Extract everything after "uploads/"
    const fileName = cleanPath.substring(uploadIndex + "uploads/".length);
    // Use the relative proxy. This is safer for CORS and mobile device Access.
    // The proxy is at /api/uploads/[...path]
    return `/api/uploads/${encodeURI(fileName)}`;
  }

  // 2. Handle local public files
  // If it doesn't contain "uploads/", it's almost certainly in the public folder.
  // We just ensure it starts with a leading slash.
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  return cleanPath;
}

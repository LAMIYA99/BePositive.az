import { API_URL } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "/placeholder-image.jpg"; // You might want a default placeholder

  // Normalize path: replace backslashes with forward slashes
  let cleanPath = path.replace(/\\/g, "/");

  // If it's already an external https link (or http), return it
  if (cleanPath.startsWith("http")) return cleanPath;

  // Ensure it starts with / if it doesn't
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  // Prepend API_URL
  return `${API_URL}${cleanPath}`;
}

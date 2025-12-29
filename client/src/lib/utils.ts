import { API_URL } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "/placeholder-image.jpg"; // You might want a default placeholder

  // If it's already an external https link, return it
  if (path.startsWith("https://")) return path;

  // If it's a relative path, prepend API_URL
  if (path.startsWith("/")) {
    return `${API_URL}${path}`;
  }

  // Handle legacy localhost links in production
  if (path.startsWith("http://localhost") && !API_URL.includes("localhost")) {
    // Replace localhost base with actual API_URL
    const relativePath = path.split("/uploads/")[1];
    if (relativePath) {
      return `${API_URL}/uploads/${relativePath}`;
    }
  }

  return path;
}

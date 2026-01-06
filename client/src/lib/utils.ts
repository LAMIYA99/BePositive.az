import { API_URL } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | undefined | null) {
  if (!path) return "/placeholder.svg";

  let cleanPath = path.replace(/\\/g, "/");

  if (cleanPath.startsWith("http")) return cleanPath;

  if (cleanPath.includes("uploads/")) {
    const uploadIndex = cleanPath.indexOf("uploads/");
    const fileName = cleanPath.substring(uploadIndex + "uploads/".length);
    return `/api/uploads/${encodeURI(fileName)}`;
  }

  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }

  return cleanPath;
}

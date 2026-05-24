import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreMeta(score: number) {
  if (score <= 3)
    return {
      label: "Needs Work",
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca",
      ring: "#dc2626",
    };
  if (score <= 6)
    return {
      label: "Average",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
      ring: "#f59e0b",
    };
  return {
    label: "Strong",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    ring: "#22c55e",
  };
}

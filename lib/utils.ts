
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "lenis/react";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

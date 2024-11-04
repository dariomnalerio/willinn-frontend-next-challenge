import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

/**
 *
 * @param inputs - Array of classes to merge
 * @returns  - String of merged classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
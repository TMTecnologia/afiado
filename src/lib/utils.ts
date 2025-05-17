/**
 * Utility functions for handling CSS class names and Tailwind styles
 *
 * - clsx: Helps construct className strings conditionally
 * - twMerge: Intelligently handles Tailwind CSS class conflicts
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and Tailwind CSS classes into a single string, resolving any conflicts.
 *
 * @param inputs - Class names, objects, or arrays to be merged.
 * @returns A merged class string with Tailwind CSS conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A TypeScript type alias called `Prettify`.
 * It takes a type as its argument and returns a new type that has the same properties as the original type,
 * but the properties are not intersected. This means that the new type is easier to read and understand.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
} & unknown;

/**
 * Utility functions for handling CSS class names and Tailwind styles
 *
 * - clsx: Helps construct className strings conditionally
 * - twMerge: Intelligently handles Tailwind CSS class conflicts
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names and Tailwind classes together, handling conflicts
 *
 * @param inputs - Array of class names/objects to be merged
 * @returns Merged class string with conflicts resolved
 *
 * Why `cn`?
 *
 * The name `cn` is a common abbreviation for "classnames" in the React/TypeScript ecosystem.
 *
 * The name `cn` is popularized by frameworks and projects like shadcn/ui, and it's become a convention because:
 * - It's short and concise
 * - It's descriptive enough for its purpose
 * - It's easy to type and remember
 * - It follows the common JavaScript pattern of using short names for frequently used utilities
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

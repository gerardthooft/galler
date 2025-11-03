export type ViewType = "loading" | "error" | "grid" | "gallery";

export type Gallery = string[];

/**
 * Takes a thumbnail URL and returns the full-size URL if it matches the provider's pattern,
 * or null if it doesn't match
 */
export type ImageProvider = (url: string) => string | null;

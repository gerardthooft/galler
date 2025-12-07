import type { Lazy } from "./utils/lazy";

export type ViewType = "loading" | "error" | "grid" | "gallery";

export type GalleryImage = {
  thumbnail: string;
  full: Lazy<string>;
};

export type Gallery = GalleryImage[];

export type ProviderError = {
  provider: string;
  url: string;
  reason: string;
};

export type ImageProviderResult =
  | { type: "matched"; image: GalleryImage }
  | { type: "error"; error: ProviderError }
  | { type: "skip" };

/**
 * Takes a thumbnail URL and returns a result indicating whether:
 * - The URL was successfully transformed (matched)
 * - The URL should be handled by this provider but couldn't be parsed (error)
 * - The URL is not for this provider (skip)
 */
export type ImageProvider = (url: string) => Promise<ImageProviderResult>;

import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://i7.vipr.im/th/xxx/zzz.jpg -> https://i7.vipr.im/i/xxx/zzz.jpg
 */
export const mapViprUrl: ImageProvider = async (url: string) => {
  if (!url.includes("vipr.im")) {
    return { type: "skip" };
  }

  if (!url.includes("/th/")) {
    return {
      type: "error",
      error: {
        provider: "vipr",
        url,
        reason: "URL does not contain /th/ segment",
      },
    };
  }

  const fullUrl = url.replace(/\/th\//, "/i/");

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => fullUrl),
    },
  };
};

import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://img107.imagetwist.com/th/07064/vmxt4s0sfsp.jpg -> https://img107.imagetwist.com/i/07064/vmxt4s0sfsp.jpg
 */
export const mapImagetwistUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imagetwist.com")) {
    return { type: "skip" };
  }

  if (!url.includes("/th/")) {
    return {
      type: "error",
      error: {
        provider: "imagetwist",
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

import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://thumbs2.imgbox.com/xxx_t.jpg -> https://images2.imgbox.com/xxx_o.jpg
 */
export const mapImgboxUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imgbox.com")) {
    return { type: "skip" };
  }

  const regex = /https:\/\/thumbs2\.imgbox\.com\/(.*?)_t\.(jpe?g)/;
  const match = url.match(regex);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "imgbox",
        url,
        reason:
          "URL format does not match expected pattern: https://thumbs2.imgbox.com/{id}_t.{ext}",
      },
    };
  }

  const fullUrl = `https://images2.imgbox.com/${match[1]}_o.${match[2]}`;

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => fullUrl),
    },
  };
};

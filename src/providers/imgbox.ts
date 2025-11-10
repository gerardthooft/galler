import type { ImageProvider } from "../types";

/**
 * Example: https://thumbs2.imgbox.com/xxx_t.jpg -> https://images2.imgbox.com/xxx_o.jpg
 */
export const mapImgboxUrl: ImageProvider = (url: string) => {
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

  return {
    type: "matched",
    url: `https://images2.imgbox.com/${match[1]}_o.${match[2]}`,
  };
};

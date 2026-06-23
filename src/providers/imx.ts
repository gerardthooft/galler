import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://imx.to/{a}/{b}/yyyy/mm/dd/xxx.jpg -> https://image.imx.to/u/i/yyyy/mm/dd/xxx.jpg
 */
export const mapImxUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imx.to")) {
    return { type: "skip" };
  }

  const regex = /https:\/\/(?:image\.|s\d+\.)?imx\.to\/[a-z]+\/[a-z]+\/(.*?)\.(jpe?g)/;
  const match = url.match(regex);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "imx",
        url,
        reason:
          "URL format does not match expected pattern: https://[image.]imx.to/{a}/{b}/{path}.(jpg|jpeg)",
      },
    };
  }

  const fullUrl = `https://image.imx.to/u/i/${match[1]}.${match[2]}`;

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => fullUrl),
    },
  };
};

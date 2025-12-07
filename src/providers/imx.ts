import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://image.imx.to/u/t/yyyy/mm/dd/xxx.jpg -> https://image.imx.to/u/i/yyyy/mm/dd/xxx.jpg
 */
export const mapImxUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imx.to")) {
    return { type: "skip" };
  }

  const regex = /https:\/\/(?:image\.)?imx\.to\/u\/t\/(.*?)\.(jpe?g)/;
  const match = url.match(regex);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "imx",
        url,
        reason:
          "URL format does not match expected pattern: https://[image.]imx.to/u/t/{path}.(jpg|jpeg)",
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

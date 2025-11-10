import type { ImageProvider } from "../types";

/**
 * Example: https://image.imx.to/u/t/yyyy/mm/dd/xxx.jpg -> https://image.imx.to/u/i/yyyy/mm/dd/xxx.jpg
 */
export const mapImxUrl: ImageProvider = (url: string) => {
  if (!url.includes("imx.to")) {
    return { type: "skip" };
  }

  const regex = /https:\/\/(?:image\.)?imx\.to\/u\/t\/(.*?)\.jpg/;
  const match = url.match(regex);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "imx",
        url,
        reason: "URL format does not match expected pattern: https://[image.]imx.to/u/t/{path}.jpg",
      },
    };
  }

  return {
    type: "matched",
    url: `https://image.imx.to/u/i/${match[1]}.jpg`,
  };
};

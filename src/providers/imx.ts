import type { ImageProvider } from "../types";

/**
 * Example: https://image.imx.to/u/t/2025/01/27/xxx.jpg -> https://image.imx.to/u/i/2025/01/27/xxx.jpg
 */
export const mapImxUrl: ImageProvider = (url: string) => {
  const regex = /https:\/\/(?:image\.)?imx\.to\/u\/t\/(.*?)\.jpg/;
  const match = url.match(regex);
  if (match) {
    return `https://image.imx.to/u/i/${match[1]}.jpg`;
  }
  return null;
};

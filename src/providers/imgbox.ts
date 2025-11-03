import type { ImageProvider } from "../types";

/**
 * Example: https://thumbs2.imgbox.com/abc123_t.jpg -> https://images2.imgbox.com/abc123_o.jpg
 */
export const mapImgboxUrl: ImageProvider = (url: string) => {
  const regex = /https:\/\/thumbs2\.imgbox\.com\/(.*?)_t\.(jpe?g)/;
  const match = url.match(regex);
  if (match) {
    return `https://images2.imgbox.com/${match[1]}_o.${match[2]}`;
  }
  return null;
};

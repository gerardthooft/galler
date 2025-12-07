import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://t1.pixhost.to/thumbs/aaa/bbb.jpg -> https://img1.pixhost.to/images/aaa/bbb.jpg
 */
export const mapPixhostUrl: ImageProvider = async (url: string) => {
  if (!url.includes("pixhost.to")) {
    return { type: "skip" };
  }

  const match = url.match(/https:\/\/t(\d+)\.pixhost\.to\/thumbs\/(.+)\.(jpe?g|png)/);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "pixhost",
        url,
        reason:
          "URL format does not match expected pattern: https://t{N}.pixhost.to/thumbs/{path}.{ext}",
      },
    };
  }

  const [, subdomain, path, extension] = match;
  const fullUrl = `https://img${subdomain}.pixhost.to/images/${path}.${extension}`;

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => fullUrl),
    },
  };
};

import type { ImageProvider } from "../types";

/**
 * Example: https://t1.pixhost.to/thumbs/aaa/bbb.jpg -> https://img1.pixhost.to/images/aaa/bbb.jpg
 */
export const mapPixhostUrl: ImageProvider = (url: string) => {
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
  return {
    type: "matched",
    url: `https://img${subdomain}.pixhost.to/images/${path}.${extension}`,
  };
};

import type { ImageProvider } from "../types";

/**
 * Example: https://i7.vipr.im/th/xxx/zzz.jpg -> https://i7.vipr.im/i/xxx/zzz.jpg
 */
export const mapViprUrl: ImageProvider = (url: string) => {
  if (!url.includes("vipr.im")) {
    return { type: "skip" };
  }

  const match = url.match(/https:\/\/(i\d+)\.vipr\.im\/th\/(.+)\.(jpe?g|png)/);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "vipr",
        url,
        reason: "URL format does not match expected pattern: https://i{N}.vipr.im/th/{path}.{ext}",
      },
    };
  }

  const [, subdomain, path, extension] = match;
  return {
    type: "matched",
    url: `https://${subdomain}.vipr.im/i/${path}.${extension}`,
  };
};

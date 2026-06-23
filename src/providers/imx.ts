import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";

/**
 * Example: https://imx.to/{a}/{b}/yyyy/mm/dd/xxx.jpg -> https://imx.to/u/i/yyyy/mm/dd/xxx.jpg
 */
export const mapImxUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imx.to")) {
    return { type: "skip" };
  }

  if (!/\/[a-z]+\/[a-z]+\//.test(url)) {
    return {
      type: "error",
      error: {
        provider: "imx",
        url,
        reason: "URL does not contain two lowercase path segments after host",
      },
    };
  }

  const fullUrl = url.replace(/\/[a-z]+\/[a-z]+\//, "/u/i/");

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => fullUrl),
    },
  };
};

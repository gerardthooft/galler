import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";
import { fetchPage } from "../utils/fetch";

/**
 * Example: http://s1d4.turboimagehost.com/t1/3843201_6301959l0z.jpg
 * Example: https://s8d2.turboimg.net/t1/94011421_scaled_full_93f151a59fd422f22f37.jpg
 * -> fetch http://www.turboimagehost.com/p/{id}/{filename}.html (lazily)
 * -> extract full image URL from page
 */
export const mapTurboimagehostUrl: ImageProvider = async (url: string) => {
  if (!url.includes("turboimagehost.com") && !url.includes("turboimg.net")) {
    return { type: "skip" };
  }

  const match = url.match(/\/t1\/(\d+)_([^"]+)/);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "turboimagehost",
        url,
        reason: "URL format does not match expected pattern: /t1/{id}_{filename}",
      },
    };
  }

  const [, imageId, filename] = match;
  const pageUrl = `http://www.turboimagehost.com/p/${imageId}/${filename}.html`;

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => {
        const html = await fetchPage(pageUrl);
        const imgMatch = html.match(/<img[^>]+class="uImage"[^>]+src="([^"]+)"/);
        if (!imgMatch) {
          throw new Error(`Could not find image URL in ${pageUrl}`);
        }
        return imgMatch[1];
      }),
    },
  };
};

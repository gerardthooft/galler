import type { ImageProvider } from "../types";
import { lazy } from "../utils/lazy";
import { fetchPage } from "../utils/fetch";

/**
 * Example: https://thumbs3.imagebam.com/11914/b728aa119132443.jpg
 *      or: https://thumbnails109.imagebam.com/37855/dc2e97378544925.jpg
 * -> fetch https://www.imagebam.com/image/b728aa119132443 (lazily)
 * -> extract full image URL from page
 */
export const mapImagebamUrl: ImageProvider = async (url: string) => {
  if (!url.includes("imagebam.com")) {
    return { type: "skip" };
  }

  const match = url.match(/(?:thumbs|thumbnails)\d+\.imagebam\.com\/[^/]+\/([a-zA-Z0-9]+)/);
  if (!match) {
    return {
      type: "error",
      error: {
        provider: "imagebam",
        url,
        reason:
          "URL format does not match expected pattern: https://thumbs{N}.imagebam.com/{group}/{ID} or https://thumbnails{N}.imagebam.com/{group}/{ID}",
      },
    };
  }

  const pageUrl = `https://www.imagebam.com/image/${match[1]}`;

  return {
    type: "matched",
    image: {
      thumbnail: url,
      full: lazy(async () => {
        const html = await fetchPage(pageUrl, {
          Cookie: "nsfw_inter=1; sfw_inter=1",
        });
        const imgTag = html.match(/<img[^>]*class="[^"]*main-image[^"]*"[^>]*>/);
        if (!imgTag) {
          throw new Error(`Could not find image element in ${pageUrl}`);
        }
        const srcMatch = imgTag[0].match(/src="(https:\/\/images\d+\.imagebam\.com\/[^"]+)"/);
        if (!srcMatch) {
          throw new Error(`Could not find image URL in ${pageUrl}`);
        }
        return srcMatch[1];
      }),
    },
  };
};

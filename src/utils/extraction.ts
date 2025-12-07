import type { Gallery, ProviderError } from "../types";
import { IMAGE_PROVIDERS } from "../providers";

export async function extractGalleries(html: string): Promise<{
  galleries: Gallery[];
  errors: ProviderError[];
}> {
  const posts = html.split("postcontainer");
  const galleries: Gallery[] = [];
  const errors: ProviderError[] = [];

  for (const post of posts) {
    const { gallery, errors: galleryErrors } = await extractGallery(post);
    if (gallery.length > 0) {
      galleries.push(gallery);
    }
    errors.push(...galleryErrors);
  }

  return { galleries, errors };
}

async function extractGallery(post: string): Promise<{
  gallery: Gallery;
  errors: ProviderError[];
}> {
  const imgRegex = /<img[^>]+src="([^"]+)"/gi;
  const imgUrls: string[] = [];
  let match;

  while ((match = imgRegex.exec(post)) !== null) {
    imgUrls.push(match[1]);
  }

  const gallery: Gallery = [];
  const errors: ProviderError[] = [];

  for (const url of imgUrls) {
    for (const provider of IMAGE_PROVIDERS) {
      const result = await provider(url);

      if (result.type === "matched") {
        gallery.push(result.image);
        break;
      } else if (result.type === "error") {
        errors.push(result.error);
        break;
      }
    }
  }
  return { gallery, errors };
}

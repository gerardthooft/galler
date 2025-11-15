import type { Gallery, ProviderError } from "../types";
import { IMAGE_PROVIDERS } from "../providers";

export function extractGalleries(html: string): {
  galleries: Gallery[];
  errors: ProviderError[];
} {
  const posts = html.split("postcontainer");
  const galleries: Gallery[] = [];
  const errors: ProviderError[] = [];

  posts.forEach((post) => {
    const { gallery, errors: galleryErrors } = extractGallery(post);
    if (gallery.length > 0) {
      galleries.push(gallery);
    }
    errors.push(...galleryErrors);
  });

  return { galleries, errors };
}

function extractGallery(post: string): {
  gallery: Gallery;
  errors: ProviderError[];
} {
  const imgRegex = /<img[^>]+src="([^"]+)"/gi;
  const imgUrls: string[] = [];
  let match;

  while ((match = imgRegex.exec(post)) !== null) {
    imgUrls.push(match[1]);
  }

  const gallery: string[] = [];
  const errors: ProviderError[] = [];

  for (const url of imgUrls) {
    for (const provider of IMAGE_PROVIDERS) {
      const result = provider(url);

      if (result.type === "matched") {
        gallery.push(result.url);
        break;
      } else if (result.type === "error") {
        errors.push(result.error);
        break;
      }
    }
  }
  return { gallery, errors };
}

import type { Gallery } from "../types";
import { IMAGE_PROVIDERS } from "../providers";

export function extractImages(html: string): Gallery[] {
  const posts = html.split("postcontainer");
  const allGalleries: Gallery[] = [];

  posts.forEach((post) => {
    const images = extractImgsFromPost(post);
    if (images.length > 0) {
      allGalleries.push(images);
    }
  });

  return allGalleries;
}

export function extractImgsFromPost(post: string): string[] {
  const imgRegex = /<img[^>]+src="([^"]+)"/gi;
  const imgUrls: string[] = [];
  let match;

  while ((match = imgRegex.exec(post)) !== null) {
    imgUrls.push(match[1]);
  }

  const extractedImages: string[] = [];

  for (const url of imgUrls) {
    for (const provider of IMAGE_PROVIDERS) {
      const fullUrl = provider(url);
      if (fullUrl) {
        extractedImages.push(fullUrl);
        break;
      }
    }
  }

  return extractedImages;
}

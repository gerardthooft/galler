import type { ImageProvider } from "../types";

/**
 * Example: https://t1.pixhost.to/thumbs/aaa/bbb.jpg -> https://img1.pixhost.to/images/aaa/bbb.jpg
 */
export const mapPixhostUrl: ImageProvider = (url: string) => {
  const match = url.match(/https:\/\/t(\d+)\.pixhost\.to\/thumbs\/(.+)\/(.+)\.(jpe?g|png)/);
  if (!match) return null;

  const [, subdomain, folder, filename, extension] = match;
  return `https://img${subdomain}.pixhost.to/images/${folder}/${filename}.${extension}`;
};

/**
 * Fetches a page through a CORS proxy
 * @param url - The URL to fetch
 * @returns The HTML content of the page
 * @throws Error if the fetch fails
 */
export async function fetchPage(url: string): Promise<string> {
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  return await response.text();
}

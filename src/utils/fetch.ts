/**
 * Fetches a page through a CORS proxy
 * @param url - The URL to fetch
 * @param headers - Optional request headers to forward (key-value pairs)
 * @returns The HTML content of the page
 * @throws Error if the fetch fails
 */
export async function fetchPage(url: string, headers?: Record<string, string>): Promise<string> {
  const params = new URLSearchParams({ url });
  if (headers) {
    for (const [name, value] of Object.entries(headers)) {
      params.append("reqHeaders", `${name}:${value}`);
    }
  }
  const proxyUrl = `https://corsproxy.io/?${params}`;
  const response = await fetch(proxyUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  return await response.text();
}

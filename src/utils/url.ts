const PAGE_SUFFIX = /\/page(\d+)\/?$/;

export const pageNumber = (url: string): number => {
  const m = url.match(PAGE_SUFFIX);
  return m ? Number(m[1]) : 1;
};

export const withPage = (url: string, page: number): string => {
  const base = url.replace(PAGE_SUFFIX, "").replace(/\/$/, "");
  return `${base}/page${page}`;
};

export const prevUrl = (url: string): string => withPage(url, pageNumber(url) - 1);

export const nextUrl = (url: string): string => withPage(url, pageNumber(url) + 1);

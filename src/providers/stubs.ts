import type { ImageProvider } from "../types";

/**
 * Not-yet-implemented providers.
 * Each returns an error so the user knows the host was recognized but unsupported.
 */
const stub =
  (host: string): ImageProvider =>
  async (url) => {
    if (!url.includes(host)) {
      return { type: "skip" };
    }
    return {
      type: "error",
      error: {
        provider: host,
        url,
        reason: "Provider not yet implemented",
      },
    };
  };

export const mapAcidimgUrl: ImageProvider = stub("acidimg.cc");
export const mapImagezillaUrl: ImageProvider = stub("imagezilla.com");
export const mapImgspiceUrl: ImageProvider = stub("imgspice.com");
export const mapPimpandhostUrl: ImageProvider = stub("pimpandhost.com");
export const mapPixxxelsUrl: ImageProvider = stub("pixxxels.cc");
export const mapPostimgUrl: ImageProvider = stub("postimg.cc");
export const mapImagevenueUrl: ImageProvider = stub("imagevenue.com");
export const mapPixrouteUrl: ImageProvider = stub("pixroute.to");

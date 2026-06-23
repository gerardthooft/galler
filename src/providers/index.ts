import type { ImageProvider } from "../types";
import {
  mapAcidimgUrl,
  mapImagevenueUrl,
  mapImagezillaUrl,
  mapImgspiceUrl,
  mapPimpandhostUrl,
  mapPixrouteUrl,
  mapPixxxelsUrl,
  mapPostimgUrl,
} from "./stubs";
import { mapImagebamUrl } from "./imagebam";
import { mapImagetwistUrl } from "./imagetwist";
import { mapImgboxUrl } from "./imgbox";
import { mapImxUrl } from "./imx";
import { mapPixhostUrl } from "./pixhost";
import { mapTurboimagehostUrl } from "./turboimagehost";
import { mapViprUrl } from "./vipr";

/**
 * Registry of all supported image providers
 * To add a new provider:
 * 1. Create a new file in src/providers/ (e.g., newprovider.ts)
 * 2. Export an ImageProvider function
 * 3. Add it to this array
 */
export const IMAGE_PROVIDERS: ImageProvider[] = [
  mapImagebamUrl,
  mapImgboxUrl,
  mapImxUrl,
  mapPixhostUrl,
  mapTurboimagehostUrl,
  mapViprUrl,
  mapAcidimgUrl,
  mapImagetwistUrl,
  mapImagezillaUrl,
  mapImgspiceUrl,
  mapPimpandhostUrl,
  mapPixxxelsUrl,
  mapPostimgUrl,
  mapImagevenueUrl,
  mapPixrouteUrl,
];

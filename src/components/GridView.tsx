import { For, Show, createSignal, type Component } from "solid-js";
import type { Gallery } from "../types";
import { GalleryView } from "./GalleryView";
import { Pagination } from "./Pagination";

interface GridViewProps {
  galleries: Gallery[];
}

export const GridView: Component<GridViewProps> = (props) => {
  const [selectedGallery, setSelectedGallery] = createSignal<Gallery | null>(null);

  return (
    <Show
      when={selectedGallery()}
      fallback={
        <div class="w-screen h-screen bg-black overflow-y-auto">
          <div class="flex flex-wrap justify-center gap-3 p-3">
            <For each={props.galleries}>
              {(gallery) => (
                <img
                  src={gallery[0].thumbnail}
                  class="h-[33vh] w-auto cursor-pointer rounded-sm object-contain"
                  referrerPolicy="no-referrer"
                  onClick={() => setSelectedGallery(gallery)}
                />
              )}
            </For>
          </div>
          <Pagination />
        </div>
      }
    >
      {(gallery) => <GalleryView gallery={gallery()} onClose={() => setSelectedGallery(null)} />}
    </Show>
  );
};

import { For, Show, createSignal, type Component } from "solid-js";
import type { Gallery } from "../types";
import { GalleryView } from "./GalleryView";

interface GridViewProps {
  galleries: Gallery[];
}

export const GridView: Component<GridViewProps> = (props) => {
  const [selectedGallery, setSelectedGallery] = createSignal<Gallery | null>(null);

  return (
    <Show
      when={selectedGallery()}
      fallback={
        <div class="flex flex-wrap justify-center gap-3 p-3 w-screen h-screen bg-black overflow-y-auto">
          <For each={props.galleries}>
            {(gallery) => (
              <img
                src={gallery[0]}
                class="h-1/3 w-auto cursor-pointer rounded-sm object-contain"
                referrerPolicy="no-referrer"
                onClick={() => setSelectedGallery(gallery)}
              />
            )}
          </For>
        </div>
      }
    >
      {(gallery) => <GalleryView gallery={gallery()} onClose={() => setSelectedGallery(null)} />}
    </Show>
  );
};

import { createSignal, type Component } from "solid-js";
import type { Gallery } from "../types";

interface GalleryViewProps {
  gallery: Gallery;
  onClose: () => void;
}

export const GalleryView: Component<GalleryViewProps> = (props) => {
  const [imageIndex, setImageIndex] = createSignal<number>(0);

  /**
   * Click top 20% to return to grid
   * Click bottom 80% to advance to next image
   */
  const handleClick = (event: MouseEvent) => {
    const clickY = event.clientY;
    const screenHeight = window.innerHeight;

    if (clickY < screenHeight * 0.2) {
      props.onClose();
    } else {
      setImageIndex((imageIndex() + 1) % props.gallery.length);
    }
  };

  return (
    <img
      onClick={handleClick}
      src={props.gallery[imageIndex()]}
      alt="Gallery image"
      class="w-screen h-screen bg-black object-contain"
    />
  );
};

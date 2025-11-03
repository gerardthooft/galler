import { createSignal, onMount, Show, type Component } from "solid-js";
import { LoadingView } from "./components/LoadingView";
import { GridView } from "./components/GridView";
import type { Gallery } from "./types";
import { fetchPage } from "./utils/fetch";
import { extractImages } from "./utils/extraction";

const App: Component = () => {
  const [statusMessage, setStatusMessage] = createSignal<string>("");
  const [isError, setIsError] = createSignal<boolean>(false);
  const [allGalleries, setAllGalleries] = createSignal<Gallery[] | null>(null);

  const showLoading = (message: string) => {
    setStatusMessage(message);
    setIsError(false);
  };

  const showError = (message: string) => {
    setStatusMessage(message);
    setIsError(true);
  };

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const targetUrl = urlParams.get("url");

    if (!targetUrl) {
      showError("No URL provided. Usage: ?url=https://example.com/page");
      return;
    }

    try {
      showLoading("Fetching page...");
      const html = await fetchPage(targetUrl);

      showLoading("Extracting images...");
      const galleries = extractImages(html);

      if (galleries.length === 0) {
        showError("No galleries found.");
        return;
      }

      setAllGalleries(galleries);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showError(`Error: ${errorMessage}`);
    }
  });

  return (
    <Show
      when={allGalleries()}
      fallback={<LoadingView message={statusMessage()} isError={isError()} />}
    >
      {(galleries) => <GridView galleries={galleries()} />}
    </Show>
  );
};

export default App;

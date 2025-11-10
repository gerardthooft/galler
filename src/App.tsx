import { createSignal, onMount, Show, type Component } from "solid-js";
import { LoadingView } from "./components/LoadingView";
import { GridView } from "./components/GridView";
import type { Gallery, ProviderError } from "./types";
import { fetchPage } from "./utils/fetch";
import { extractGalleries } from "./utils/extraction";

const App: Component = () => {
  const [statusMessage, setStatusMessage] = createSignal<string>("");
  const [isError, setIsError] = createSignal<boolean>(false);
  const [allGalleries, setAllGalleries] = createSignal<Gallery[] | null>(null);
  const [providerErrors, setProviderErrors] = createSignal<ProviderError[]>([]);

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
      const { galleries, errors } = extractGalleries(html);

      if (errors.length > 0) {
        setProviderErrors(errors);
      }

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
      {(galleries) => (
        <>
          <GridView galleries={galleries()} />
          {providerErrors().length > 0 && (
            <div class="bg-yellow-900/20 border border-yellow-600/50 text-yellow-200 px-4 py-3 rounded mb-4 mx-4 mt-4">
              <p class="font-bold mb-2">Provider warnings ({providerErrors().length}):</p>
              <ul class="list-disc list-inside space-y-1 text-sm">
                {providerErrors().map((error) => (
                  <li>
                    <strong>{error.provider}:</strong> {error.reason}
                    <br />
                    <span class="text-yellow-400/70 text-xs ml-5">{error.url}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Show>
  );
};

export default App;

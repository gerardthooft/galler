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
      const { galleries, errors } = await extractGalleries(html);

      if (errors.length > 0) {
        setProviderErrors(errors);
      }

      setAllGalleries(galleries);
      console.log(galleries);

      if (galleries.length === 0) {
        showError("No galleries found.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      showError(`Error: ${errorMessage}`);
    }
  });

  return (
    <>
      <Show
        when={allGalleries()}
        fallback={<LoadingView message={statusMessage()} isError={isError()} />}
      >
        {(galleries) => (
          <>
            <Show when={galleries().length === 0}>
              <LoadingView message={statusMessage()} isError={isError()} />
            </Show>
            <Show when={galleries().length > 0}>
              <GridView galleries={galleries()} />
            </Show>
          </>
        )}
      </Show>
      {providerErrors().length > 0 && (
        <div class="bg-red-950 text-red-100 p-4">
          <h2 class="font-bold mb-2">Provider warnings ({providerErrors().length}):</h2>
          <ul class="list-disc list-inside space-y-1 text-sm">
            {providerErrors().map((error) => (
              <li>
                <strong>{error.provider}:</strong> {error.reason}
                <br />
                <span class="text-red-400 text-xs ml-5">{error.url}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default App;

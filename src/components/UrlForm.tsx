import { createSignal, type Component } from "solid-js";

export const UrlForm: Component = () => {
  const [url, setUrl] = createSignal("");
  const [error, setError] = createSignal("");

  const submit = (e: Event) => {
    e.preventDefault();
    const value = url().trim();
    if (!value) {
      setError("Please enter a URL.");
      return;
    }
    try {
      new URL(value);
    } catch {
      setError("That doesn't look like a valid URL.");
      return;
    }
    window.location.search = "?url=" + encodeURIComponent(value);
  };

  return (
    <div class="flex items-center justify-center w-screen h-screen bg-black">
      <form onSubmit={submit} class="flex flex-col gap-3 w-full max-w-lg p-6">
        <label for="url" class="text-white text-lg font-sans">
          Image page URL
        </label>
        <input
          id="url"
          type="text"
          placeholder="https://imgbox.com/..."
          value={url()}
          onInput={(e) => {
            setUrl(e.currentTarget.value);
            setError("");
          }}
          class="w-full p-3 rounded bg-neutral-900 text-white border border-neutral-700 focus:border-white focus:outline-none"
          autofocus
        />
        {error() && <p class="text-red-400 text-sm">{error()}</p>}
        <button
          type="submit"
          class="self-start px-5 py-2 rounded bg-white text-black font-semibold hover:bg-neutral-300 transition-colors"
        >
          Open gallery
        </button>
      </form>
    </div>
  );
};

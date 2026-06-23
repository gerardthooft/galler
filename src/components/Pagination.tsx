import { createSignal, type Component } from "solid-js";
import { pageNumber, prevUrl, nextUrl, withPage } from "../utils/url";

export const Pagination: Component = () => {
  const url = () => new URLSearchParams(window.location.search).get("url") ?? "";
  const page = () => pageNumber(url());
  const [inputPage, setInputPage] = createSignal(page().toString());
  const go = (target: string) => {
    window.location.search = "?url=" + encodeURIComponent(target);
  };

  const submit = () => {
    const n = Number(inputPage());
    if (Number.isInteger(n) && n > 0 && n !== page()) {
      go(withPage(url(), n));
    }
  };

  return (
    <div class="flex items-center justify-center gap-4 p-4 bg-black text-white">
      <button
        type="button"
        disabled={page() <= 1}
        onClick={() => go(prevUrl(url()))}
        class="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-neutral-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <input
        type="number"
        min="1"
        value={page()}
        onInput={(e) => setInputPage(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        onBlur={submit}
        class="appearance-none w-20 p-2 rounded bg-neutral-900 text-white text-center border border-neutral-700 focus:border-white focus:outline-none"
      />
      <button
        type="button"
        onClick={() => go(nextUrl(url()))}
        class="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-neutral-300 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

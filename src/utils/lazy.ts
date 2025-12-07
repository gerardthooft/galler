/**
 * A lazy-evaluated value that mimics Scala's `lazy val` semantics.
 *
 * The factory function is not called until the value is first accessed (awaited).
 * After the first evaluation, the result is cached and reused for all subsequent accesses.
 *
 * @template T The type of the value produced by the factory function
 */
export interface Lazy<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
  ): Promise<TResult1 | TResult2>;

  readonly isEvaluated: boolean;
}

/**
 * Creates a lazy-evaluated value that defers execution until first access.
 *
 * The factory function is not executed when `lazy()` is called, but only when
 * the returned Lazy is first awaited. The result is cached, so subsequent
 * accesses return the same value without re-executing the factory.
 *
 * If the factory throws or rejects, the error is also cached and rethrown on
 * subsequent accesses.
 *
 * @template T The type of the value produced by the factory function
 * @param factory An async function that produces the value
 * @returns A Lazy that can be awaited to get the value
 *
 * @example
 * ```typescript
 * const lazyUrl = lazy(async () => {
 *   console.log('Fetching...');
 *   const html = await fetchPage(url);
 *   return parseImageUrl(html);
 * });
 *
 * // First access - triggers evaluation
 * const url1 = await lazyUrl; // Logs: "Fetching..."
 *
 * // Second access - uses cached value
 * const url2 = await lazyUrl; // Does NOT log again
 * ```
 */
export function lazy<T>(factory: () => Promise<T>): Lazy<T> {
  let cachedPromise: Promise<T> | undefined;

  return {
    then(onfulfilled?, onrejected?) {
      cachedPromise ??= factory();
      return cachedPromise.then(onfulfilled, onrejected);
    },

    get isEvaluated() {
      return cachedPromise !== undefined;
    },
  };
}

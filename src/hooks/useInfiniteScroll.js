
import { useEffect, useRef } from "react";

function useInfiniteScroll({
  loading,
  hasMore,
  error,
  onLoadMore,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    const target = bottomRef.current;

    // Don't observe if we cannot load more data.
    if (!target || loading || !hasMore || error) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(target);

    // Clean up the observer.
    return () => observer.disconnect();

  }, [loading, hasMore, error, onLoadMore]);

  return bottomRef;
}

export default useInfiniteScroll;

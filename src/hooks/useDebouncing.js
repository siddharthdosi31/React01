
import { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a timer whenever the value changes.
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the previous timer if value changes again.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a debounced function to update the debounced value
    const debouncedUpdate = debounce(() => {
      setDebouncedValue(value);
    }, delay);
    // Call the debounced function
    debouncedUpdate();
    // Cleanup the debounced function on unmount
    return () => {
      debouncedUpdate.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

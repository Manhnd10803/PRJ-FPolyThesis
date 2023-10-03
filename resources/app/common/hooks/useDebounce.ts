import { useState, useEffect } from 'react';

const useDebounce = (
  text: string,
  delay: number = import.meta.env.VITE_DEBOUNCE_TIME || 300
) => {
  const [debounced, setDebounced] = useState<string>(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debounced;
};

export default useDebounce;

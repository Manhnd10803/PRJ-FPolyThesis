import { useState, useEffect } from 'react';

export const useDebounce = (value: any, delay: any) => {
  const [deboucedValue, setDeboucedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDeboucedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value]);
  return deboucedValue;
};

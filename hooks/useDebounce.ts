import { useEffect, useState } from 'react';

type Props<T> = {
  value: T;
  delay?: number;
};

export const useDebounce = <T>({ value, delay = 500 }: Props<T>) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
};


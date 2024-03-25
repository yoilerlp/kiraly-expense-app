import { getStorageItem } from '@/utils/storage';
import React from 'react';

export default function useStorageValue<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(defaultValue);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    getStorageItem(key)
      .then((value) => {
        if (value) {
          setValue(value as T);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  return { value, loading };
}


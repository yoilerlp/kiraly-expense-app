import { View, Text } from 'react-native';
import React from 'react';

export default function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted.current;
}


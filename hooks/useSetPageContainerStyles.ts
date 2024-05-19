import { useCallback, useMemo } from 'react';

import { IPageStatusBarStyles } from '@/context/pageContext';
import usePageContainer from './usePageContainer';
import { useFocusEffect } from 'expo-router';

export default function useSetPageContainerStyles(
  styles: Partial<IPageStatusBarStyles>
) {
  const { setPagePartStyles, resetPagePartStyles } = usePageContainer();

  const stylesMemo = useMemo(() => styles, []);

  useFocusEffect(
    useCallback(() => {
      if (!styles || Object.keys(styles).length === 0) return;
      setPagePartStyles(styles);

      return () => {
        resetPagePartStyles();
      };
    }, [stylesMemo])
  );
}


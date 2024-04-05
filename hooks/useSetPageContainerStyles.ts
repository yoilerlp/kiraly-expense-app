import { useLayoutEffect, useMemo } from 'react';

import { IPageStatusBarStyles } from '@/context/pageContext';
import usePageContainer from './usePageContainer';

export default function useSetPageContainerStyles(
  styles: Partial<IPageStatusBarStyles>
) {
  const { setPagePartStyles, resetPagePartStyles } = usePageContainer();

  const stylesMemo = useMemo(() => styles, []);

  useLayoutEffect(() => {
    if (!styles || Object.keys(styles).length === 0 ) return;
    setPagePartStyles(styles);

    return () => {
      resetPagePartStyles();
    };
  }, [stylesMemo]);
}


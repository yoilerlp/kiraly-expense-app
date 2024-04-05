import { PageContext } from '@/context/pageContext';
import { useContext } from 'react';

export default function usePageContainer() {
  return useContext(PageContext);
}

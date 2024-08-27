import { useQuery } from '@tanstack/react-query';
import { GetRandomQuote } from '@/services/quote';

export default function useRandomQuote(params: { category: string }) {
  const quoteQuery = useQuery({
    queryKey: ['GET_RANDOM_QUOTE_QUERY_KEY'],
    queryFn: () => GetRandomQuote(params),
  });

  return quoteQuery;
}

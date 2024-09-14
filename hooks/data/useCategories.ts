import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services';

export default function useCategories() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.GetAllCategories,
    refetchOnWindowFocus: true,
  });

  return { data, isError, isPending, error };
}


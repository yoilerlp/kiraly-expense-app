import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services';

export default function useCategories() {
  const { data, isError, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.GetAllCategories,
  });

  return { data, isError, isPending };
}


import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services';
import { CategoryType } from '@/interfaces';

export default function useCategories() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.GetAllCategories,
    refetchOnWindowFocus: true,
  });

  const activeCategories = data?.filter((item) => item.isActive) || [];

  const userCategories = data?.filter(
    (item) => item.type === CategoryType.USER
  );

  return { data, activeCategories, userCategories, isError, isPending, error };
}


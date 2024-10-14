import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '@/services';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function useMutateCategory() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: createCategoryMutation, isPending: createCategoryIsPending } =
    useMutation({
      mutationFn: CategoryService.CreateCategory,
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: 'Category created successfully',
        });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        router.replace('/category/');
      },
      onError: (error: string) => {
        Toast.show({
          type: 'error',
          text1: error,
          text2: 'Failed to create category',
        });
      },
    });

  const { mutate: updateCategoryMutation, isPending: updateCategoryIsPending } =
    useMutation({
      mutationFn: CategoryService.UpdateCategory,
      onSuccess: (data) => {
        Toast.show({
          type: 'success',
          text1: 'Category updated successfully',
        });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        router.replace('/category/');
      },
      onError: (error: string) => {
        Toast.show({
          type: 'error',
          text1: error,
          text2: 'Failed to update budget',
        });
      },
    });

  return {
    createCategoryMutation,
    updateCategoryMutation,
    isLoding: createCategoryIsPending || updateCategoryIsPending,
  };
}


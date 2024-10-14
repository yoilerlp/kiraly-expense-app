import FetchWrapper from '@/components/FetchWrapper';
import CreateCategoryForm from '@/components/ui/category/CreateCategoryForm';
import { CategoryService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

function ViewCategory() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => CategoryService.GetOneById(id),
    enabled: !!id,
  });

  const initialValues = useMemo(() => {
    if (!data) return;

    return {
      description: data.description,
      icon: data.icon!,
      name: data.name,
      key: data.key,
      mainColor: data.mainColor!,
      subColor: data.subColor!,
      isActive: data.isActive,
    };
  }, [data]);

  return (
    <FetchWrapper loading={isLoading} error={error}>
      <CreateCategoryForm isUpdating id={id} initialValues={initialValues} />
    </FetchWrapper>
  );
}

export default ViewCategory;


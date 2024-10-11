import { View, FlatList } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import FetchWrapper from '@/components/FetchWrapper';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import { Icon } from '@/components';
import useCategories from '@/hooks/data/useCategories';
import CategoryCard from '@/components/ui/category/CategoryCard';

export default function CategoriesView() {
  const { styles, theme } = useStyles(StylesSheet);

  const { data, isPending, error } = useCategories();

  return (
    <FetchWrapper loading={isPending} error={error}>
      <SafeAreasSetting
        statusBarBgColor={theme.Colors.violet_100}
        statusBarProps={{ style: 'auto' }}
      />
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <ScreenHeader
                title='Categories'
                textColor={theme.Colors.light_100}
                bgColor={theme.Colors.violet_100}
                rightIcon={
                  <Icon.WithLink
                    href='/category/create'
                    name='Add'
                    size={32}
                    color={theme.Colors.light_100}
                  />
                }
              />
            ),
          }}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard category={item} key={item.id} />
          )}
        />
      </View>
    </FetchWrapper>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.light_100,
    paddingVertical: 24,
  },
}));


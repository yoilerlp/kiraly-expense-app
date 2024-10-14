import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Category } from '@/interfaces';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import { Link } from 'expo-router';
import { getCategoryConfig } from '@/utils';

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { styles, theme } = useStyles(StylesSheet);

  const categoryConfig = getCategoryConfig(category);

  return (
    <Link
      href={{
        pathname: '/category/[id]',
        params: {
          id: category.id,
        },
      }}
      asChild
    >
      <TouchableOpacity style={styles.wrapper} activeOpacity={0.3}>
        <View style={styles.container}>
          <View style={styles.accountType(categoryConfig.containerColor)}>
            <Icon
              name={categoryConfig.name}
              size={32}
              color={categoryConfig.iconColor}
            />
          </View>
          <Typography type='Title4'>{category.name}</Typography>
          <View style={styles.iconsContainer}>
            <Icon.WithLink
              href={`/category/${category.id}`}
              size={24}
              name='Edit'
              color={theme.Colors.violet_100}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const StylesSheet = createStyleSheet((theme) => ({
  wrapper: {
    borderBottomWidth: 1,
    borderColor: theme.Colors.light_60,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  accountType: (bgColor: string) => ({
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: bgColor || '#F1F1FA',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    flexGrow: 1,
  },
}));

export default CategoryCard;


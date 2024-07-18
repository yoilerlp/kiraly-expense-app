import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '../typography';

type CategoryTagProps = {
  color?: string;
  categoryName: string;
};

export default function CategoryTag({
  categoryName,
  color = 'black',
}: CategoryTagProps) {
  const { styles } = useStyles(CategoryTagStyles);

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: color }]} />
      <Typography type='Body3'>{categoryName}</Typography>
    </View>
  );
}

const CategoryTagStyles = createStyleSheet((theme) => ({
  container: {
    width: 'auto',
    flexGrow: 0,
    padding: 8,
    paddingRight: 16,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
}));


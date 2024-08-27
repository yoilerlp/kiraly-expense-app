import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '../typography';
import Icon, { IconName } from '../icon';

type CategoryIconCardProps = {
  containerColor: string;
  iconName: IconName;
  categoryName: string;
  wrapperStyles?: ViewStyle
};

export default function CategoryIconCard({
  containerColor,
  iconName,
  categoryName,
  wrapperStyles
}: CategoryIconCardProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <View style={[styles.categorySection, wrapperStyles]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: containerColor || theme.Colors.light_100,
          },
        ]}
      >
        <Icon name={iconName || 'Other'} size={18} />
      </View>
      <Typography type='Title3'>{categoryName}</Typography>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  categorySection: {
    borderWidth: 1,
    borderColor: theme.Colors.light_40,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Colors.yellow_20,
    padding: 4,
    borderRadius: 8,
  },
}));

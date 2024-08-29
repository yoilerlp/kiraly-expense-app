import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '../typography';

type TabNavigationItemProps = {
  isActive?: boolean;
  text: string;
  onPress: () => void;
};

export default function TabNavigationItem({
  isActive = true,
  text,
  onPress,
}: TabNavigationItemProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <TouchableOpacity
      style={styles.tab(isActive)}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Typography
        type='Body1'
        color={isActive ? theme.Colors.light_100 : theme.Colors.dark_100}
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  tab: (isActive = false) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isActive ? theme.Colors.violet_100 : 'transparent',
    borderRadius: 32,
  }),
}));

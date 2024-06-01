import React from 'react';
import { Pressable, TouchableOpacity, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '../typography';

type Size = 'small' | 'medium' | 'large';

type Props = {
  onPressTab: () => void;
  label: string;
  isActive?: boolean;
  size: Size;
  color: 'violet' | 'yellow';
  isSingle?: boolean;
  styles?: ViewStyle;
};

export default function PillTab({
  onPressTab,
  label,
  isActive = false,
  size = 'medium',
  color = 'yellow',
  styles: customStyles = {},
}: Props) {
  const { styles } = useStyles(pillTabStyles, { color, size });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.itemContainer(isActive), customStyles]}
      onPress={onPressTab}
    >
      <Typography type='Body3' style={[styles.itemText(isActive)]}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const pillTabStyles = createStyleSheet((theme) => ({
  itemContainer: (isActive: boolean) => ({
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    variants: {
      size: {
        small: {
          minHeight: 32,
        },
        medium: {
          minHeight: 34,
        },
        large: {
          minHeight: 42,
          borderRadius: 24,
        },
      },
      color: {
        violet: {
          backgroundColor: isActive ? theme.Colors.violet_20 : 'transparent',
        },
        yellow: {
          backgroundColor: isActive ? theme.Colors.yellow_20 : 'transparent',
        },
      },
    },
  }),
  itemText: (isActive: boolean) => ({
    fontFamily: isActive
      ? theme.FontNames.InterBold
      : theme.FontNames.InterMedium,
    variants: {
      size: {
        small: {
          fontSize: 12,
        },
        medium: {
          fontSize: 14,
        },
        large: {
          fontSize: 16,
        },
      },
      color: {
        violet: {
          color: isActive ? theme.Colors.violet_100 : theme.Colors.dark_100,
        },
        yellow: {
          color: isActive ? theme.Colors.yellow_100 : theme.Colors.light_20,
        },
      },
    },
  }),
}));


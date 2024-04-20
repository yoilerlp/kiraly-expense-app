import Icon, { IconName } from '@/components/icon';
import Typography from '@/components/typography';
import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function TabBarItem({
  title,
  icon,
  isActive = false,
  onPress,
}: {
  title: string;
  icon: IconName;
  isActive?: boolean;
  onPress: () => void;
}) {
  const { styles, theme } = useStyles(TabBarItemStyles);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon
          name={icon}
          size={24}
          color={isActive ? theme.Colors.violet_100 : theme.Colors.grayIcon}
        />
      </View>
      <Typography type='Body1' style={styles.title(isActive)}>
        {title}
      </Typography>
    </Pressable>
  );
}

const TabBarItemStyles = createStyleSheet((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height: 48,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: (isActive: boolean) => {
    return {
      fontSize: 12,
      lineHeight: 12,
      color: isActive ? theme.Colors.violet_100 : theme.Colors.grayIcon,
    };
  },
}));


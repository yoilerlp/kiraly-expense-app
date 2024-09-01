import Icon, { IconName } from '@/components/icon';
import Typography from '@/components/typography';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ProfileActionItemProps = {
  text: string;
  icon: IconName;
  isLogout?: boolean;
  onPress?: VoidFunction;
};

export default function ProfileActionItem({
  text,
  icon,
  isLogout = false,
  onPress,
}: ProfileActionItemProps) {
  const { styles, theme } = useStyles(Stylessheet);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isLogout ? theme.Colors.red_20 : '#EEE5FF',
          },
        ]}
      >
        <Icon
          name={icon}
          color={isLogout ? theme.Colors.red_100 : theme.Colors.violet_100}
        />
      </View>
      <Typography type='Title4' color={theme.Colors.dark_100}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
}

const Stylessheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderColor: theme.Colors.light_60,
  },
  iconContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
}));

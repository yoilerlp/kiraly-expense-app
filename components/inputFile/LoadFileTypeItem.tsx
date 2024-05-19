import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon, { IconName } from '../icon';
import Typography from '../typography';

type Props = {
  icon: IconName;
  title: string;
  onPress?: () => void;
};

export default function LoadFileTypeItem({ icon, title, onPress }: Props) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Icon name={icon} color={theme.Colors.violet_100} size={34} />
      <Typography fontSize={16} color={theme.Colors.violet_100} type='Title4'>
        {title}
      </Typography>
    </TouchableOpacity>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    width: 107,
    height: 90,
    backgroundColor: theme.Colors.violet_20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    gap: 8,
  },
}));


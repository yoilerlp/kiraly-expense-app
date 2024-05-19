import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, ViewStyle } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  size?: number;
  style?: ViewStyle;
}>;

export default function SectionRounded({
  size = 1,
  style: styleProp = {},
  children,
}: Props) {
  const { styles } = useStyles(StylesSheet);

  return (
    <View style={[styles.section, styleProp, { flex: size }]}>{children}</View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  section: {
    backgroundColor: theme.Colors.light_100,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderColor: 'transparent',
  },
}));


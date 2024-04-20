import React, { ComponentProps } from 'react';
import { Text } from 'react-native';

import { TypographyList } from '@/theme/Typography';
import { Colors } from '@/theme/Colors';

type TypographyTypes = keyof typeof TypographyList;

type TypographyProps = ComponentProps<typeof Text> & {
  type: TypographyTypes;
  center?: boolean;
};

export default function Typography({
  type,
  center,
  ...props
}: TypographyProps) {
  const defaulStyle: (typeof props)['style'] = {
    color: Colors.dark_100,
    textAlign: center ? 'center' : 'left',
  };
  return (
    <Text {...props} style={[TypographyList[type], defaulStyle, props.style]}>
      {props.children}
    </Text>
  );
}


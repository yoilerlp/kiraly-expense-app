import React, { ComponentProps } from 'react';
import { Text } from 'react-native';

import { TypographyList } from '@/theme/Typography';
import { Colors } from '@/theme/Colors';

type TypographyTypes = keyof typeof TypographyList;

type TypographyProps = ComponentProps<typeof Text> & {
  type: TypographyTypes;
  center?: boolean;
  color?: string;
  fontSize?: number;
};

export default function Typography({
  type,
  center,
  color,
  fontSize,
  ...props
}: TypographyProps) {
  const styleProp = props?.style ?? {};

  const defaulStyle: (typeof props)['style'] = {
    color: color ?? Colors.dark_100,
    textAlign: center ? 'center' : 'left',
    fontSize: fontSize || TypographyList[type].fontSize,
  };

  const customStyle = Array.isArray(styleProp) ? styleProp : [styleProp];

  return (
    <Text
      {...props}
      style={[TypographyList[type], defaulStyle, ...customStyle]}
    >
      {props.children}
    </Text>
  );
}


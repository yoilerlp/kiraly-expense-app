import { Colors } from '@/theme/Colors';
import React, { ComponentProps, useState } from 'react';
import { Switch as NativeSwitch } from 'react-native';

type Props = ComponentProps<typeof NativeSwitch> & {};

export default function Switch({ ...restProps }: Props) {
  // const isEnabled = restProps?.value;
  return (
    <NativeSwitch
      trackColor={{ false: Colors.violet_20, true: Colors.violet_100 }}
      thumbColor={Colors.light_100}
      ios_backgroundColor={Colors.violet_20}
      {...restProps}
    />
  );
}


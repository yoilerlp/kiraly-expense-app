import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PageContainer({ children }: PropsWithChildren) {
  const { top, bottom, left, right } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      {children}
    </View>
  );
}


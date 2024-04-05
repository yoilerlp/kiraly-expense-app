import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import usePageContainer from '@/hooks/usePageContainer';

export default function PageContainer({ children }: PropsWithChildren) {
  const { top, bottom, left, right } = useSafeAreaInsets();

  const { statusBarStyles } = usePageContainer();

  const { viewBottomContainerStyles, statusBarContainerStyles } =
    statusBarStyles;

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      <View
        style={{
          height: top,
          ...statusBarContainerStyles,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
      <View>
        <View
          style={{
            height: bottom,
            ...viewBottomContainerStyles,
          }}
        />
      </View>
    </View>
  );
}


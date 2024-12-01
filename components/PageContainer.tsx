import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { PropsWithChildren, useEffect } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import usePageContainer from '@/hooks/usePageContainer';
import { StatusBar } from 'expo-status-bar';
import { usePathname, useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';

// const authRoute = '/auth';

export default function PageContainer({ children }: PropsWithChildren) {
  // const router = useRouter();

  // const { appUnlocked, shouldReAuth, setAppUnlocked } = useAuth();

  // const path = usePathname();

  const { top, bottom, left, right } = useSafeAreaInsets();

  const { statusBarStyles } = usePageContainer();

  const {
    viewBottomContainerStyles,
    statusBarContainerStyles,
    statusBarProps,
  } = statusBarStyles;

  // useEffect(() => {
  //   if (!path.startsWith(authRoute) && !appUnlocked && shouldReAuth) {
  //     console.log('path auth', path);
  //     router.replace(`/auth/validateSession?from=${path}` as any);
  //   }
  // }, [path]);
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      <StatusBar
        style={statusBarProps?.style || 'auto'}
        backgroundColor={statusBarContainerStyles?.backgroundColor}
      />
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


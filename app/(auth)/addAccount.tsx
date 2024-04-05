import { createStyleSheet, useStyles } from 'react-native-unistyles';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { Select } from '@/components';

export default function AddAccount() {
  const { styles, theme } = useStyles(addAccountStyles);
  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.violet_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: 'white',
    },
  });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <View style={styles.container}>
      <StatusBar style='light' networkActivityIndicatorVisible={false} />
      <View style={styles.content}></View>
      <BottomSheet
        ref={bottomSheetRef}
        animateOnMount={false}
        enableOverDrag={false}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => null}
        backgroundStyle={styles.sheetContainer}
      >
        <BottomSheetView style={[styles.sheetContainer, styles.sheetContent]}>
          <Text>TEST 🎉</Text>
          <Select />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const addAccountStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
  },
  content: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    flex: 1,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
  },
  sheetContent: {
    padding: 16,
    paddingTop: 24,
  },
}));


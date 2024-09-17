import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { View, Text, Modal, ViewStyle } from 'react-native';
import React, { PropsWithChildren, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomSheetCompProps = PropsWithChildren<
  Pick<BottomSheetProps, 'index' | 'onChange' | 'snapPoints'> & {
    backdropStyle?: ViewStyle;
  }
>;

function CustomBottomSheetComp({
  index,
  onChange,
  snapPoints = ['25%'],
  children,
  backdropStyle,
}: BottomSheetCompProps) {
  const ref = React.useRef<BottomSheet>(null);

  const { styles } = useStyles(StylesSheet);

  const { bottom } = useSafeAreaInsets();

  if (index === -1) return null;

  return (
    <BottomSheet
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={onChange}
      backdropComponent={({ style }) => (
        <View style={[style, styles.backdrop, backdropStyle]} />
      )}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={{ flex: 1, paddingBottom: bottom, zIndex: 20 }}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  sheet: {
    backgroundColor: theme.Colors.violet_100,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
  },
  backdrop: {
    flex: 1,
    backgroundColor: theme.Colors.dark_100,
    opacity: 0.16,
    zIndex: 200,
  },
  background: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: theme.Colors.violet_40,
  },
}));

export default memo(CustomBottomSheetComp);


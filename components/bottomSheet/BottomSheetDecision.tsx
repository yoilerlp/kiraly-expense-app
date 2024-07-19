import React from 'react';
import { View } from 'react-native';
import Typography from '../typography';
import { Colors } from '@/theme/Colors';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Button from '../button';

type Props = {
  title: string;
  subtitle: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function BottomSheetDecision({
  title,
  subtitle,
  isLoading,
  onCancel,
  onConfirm,
}: Props) {
  const { styles } = useStyles(StylesSheet);

  return (
    <View style={styles.sheetContent}>
      <Typography fontSize={18} color={Colors.dark_100} type='Title3'>
        {title}
      </Typography>
      <Typography center fontSize={16} color={Colors.light_20} type='Title4'>
        {subtitle}
      </Typography>
      <View style={styles.sheetBtnContainer}>
        <View style={{ flex: 1 }}>
          <Button
            disabled={isLoading}
            onPress={() => {
              onCancel();
            }}
            text='No'
            size='full'
            variant='secondary'
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onPress={() => {
              onConfirm();
            }}
            text='Yes'
            size='full'
          />
        </View>
      </View>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  sheetContent: {
    paddingTop: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 16,
  },
  sheetBtnContainer: {
    flexDirection: 'row',
    gap: 16,
  },
}));


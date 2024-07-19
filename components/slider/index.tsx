import React from 'react';
import NativeSlider from '@react-native-community/slider';
import { Colors } from '@/theme/Colors';
import { View } from 'react-native';
import Typography from '../typography';

type Props = {
  value?: number;
  onValueChange: (value: number) => void;
  errorMsg?: string;
};

export default function Slider({ value, onValueChange, errorMsg }: Props) {
  return (
    <View>
      <NativeSlider
        step={10}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={Colors.violet_100}
        maximumTrackTintColor={Colors.light_40}
        thumbTintColor={Colors.violet_100}
        value={value}
        onValueChange={onValueChange}
      />
      <Typography center type='Body1' color={Colors.violet_100}>
        {value || 0}%
      </Typography>
      {errorMsg && (
        <Typography type='Tiny' color={Colors.red_80}>
          {errorMsg}
        </Typography>
      )}
    </View>
  );
}


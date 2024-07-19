import { Colors } from '@/theme/Colors';
import React from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

type ProgressBarProps = {
  fillColor: string;
  progress: number;
};

export default function ProgressBar({ fillColor, progress }: ProgressBarProps) {
  const progressValue = progress > 100 ? 100 : progress;
  return (
    <View>
      <Svg width={'100%'} height={20}>
        <Rect
          width={'100%'}
          height={12}
          x={0}
          y={4}
          fill={Colors.light_60}
          rx={5}
          ry={5}
        />
        <Rect
          width={`${progressValue}%`}
          height={12}
          x={0}
          y={4}
          fill={fillColor}
          rx={5}
          ry={5}
        />
      </Svg>
    </View>
  );
}


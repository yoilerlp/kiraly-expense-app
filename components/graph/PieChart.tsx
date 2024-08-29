import { Colors } from '@/theme/Colors';
import React from 'react';
import { PieChart, PieChartPropsType } from 'react-native-gifted-charts';

type PieChartCompProps = Pick<
  PieChartPropsType,
  'data' | 'centerLabelComponent'
> & {};

export default function PieChartComp({
  data,
  centerLabelComponent,
}: PieChartCompProps) {
  const radius = 150;

  return (
    <PieChart
      isAnimated
      donut
      innerRadius={radius * 0.6}
      radius={radius}
      data={data}
      centerLabelComponent={centerLabelComponent}
      showText
      textColor={Colors.light_100}
      textSize={16}
    />
  );
}

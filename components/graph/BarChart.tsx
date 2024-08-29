import { Colors } from '@/theme/Colors';

import { BarChart as Bar, BarChartPropsType } from 'react-native-gifted-charts';

type BarChartProps = Pick<BarChartPropsType, 'data'> & {
  width?: number;
};

export default function BarChart({ data }: BarChartProps) {
  return (
    <Bar
      spacing={14}
      activeOpacity={0.8}
      hideRules
      adjustToWidth
      frontColor={Colors.violet_100}
      data={data}
      noOfSections={5}
      isAnimated
    />
  );
}

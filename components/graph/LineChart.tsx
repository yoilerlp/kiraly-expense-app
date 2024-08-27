import { Dimensions, StyleSheet, View } from 'react-native';
import { Svg, Path, LinearGradient, Defs, Stop } from 'react-native-svg';
import { memo, useMemo } from 'react';

import { Colors } from '@/theme/Colors';
import { LineChartData, generateLineChart } from '@/utils/chart';
import Typography from '../typography';

const { width } = Dimensions.get('window');

const WIDTH = width;

const HEIGHT = 185;

type Props = {
  data: LineChartData;
  minDate: string;
  maxDate: string;
};

function LineChart({ data, minDate, maxDate }: Props) {
  const path = useMemo(() => {
    return generateLineChart({
      data,
      width: WIDTH,
      height: HEIGHT,
      minDate,
      maxDate,
    });
  }, [data, minDate, maxDate]);

  if (!path || data?.length < 3 || !minDate || !maxDate) {
    return (
      <View style={[styles.container, { height: HEIGHT / 2 }]}>
        <Typography type='Body1' color={Colors.violet_100}>
          No enough data for generate chart
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Defs>
          <LinearGradient id='grad' x1='0%' y1='0%' x2='0%' y2='100%'>
            <Stop offset='0%' stopColor={Colors.violet_100} stopOpacity={0.7} />
            <Stop offset='100%' stopColor={Colors.violet_100} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        <Path
          d={path?.line!}
          fill='none'
          stroke={Colors.violet_100}
          strokeWidth={6}
        />
        <Path
          d={path?.area!}
          fill={'url(#grad)'}
          stroke={'none'}
          strokeWidth={8}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(LineChart);

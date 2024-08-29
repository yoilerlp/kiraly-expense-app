import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const DonutChart = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill={color} {...props}>
      <Path d='M28 15H17V4a12 12 0 0111 11z' />
      <Path d='M28 17A12 12 0 1115 4v12a1 1 0 001 1h12z' />
    </Svg>
  )
);

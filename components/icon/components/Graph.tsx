import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Graph = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill={color} {...props}>
      <Path d='M30 10a4 4 0 01-4 4 3.93 3.93 0 01-1.87-.47l-5.78 6.3A4 4 0 0119 22a4 4 0 11-8 0 3.8 3.8 0 01.34-1.58l-2.9-2.25A3.94 3.94 0 016 19a4 4 0 114-4 4 4 0 01-.33 1.58l2.89 2.25a4 4 0 014.32-.36l5.77-6.3A4 4 0 0122 10a4 4 0 118 0z' />
    </Svg>
  )
);

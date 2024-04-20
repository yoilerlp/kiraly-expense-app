import Svg, { Path } from 'react-native-svg';

import { memo } from 'react';

import type { IconProps } from '../index';

export const ArrowBack = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} fill={color} {...props}>
      <Path
        fill={color}
        d='M23 8H2.59L8 2.64a1 1 0 1 0-1.41-1.42L.88 6.88a3 3 0 0 0 0 4.24l5.66 5.66a1 1 0 0 0 1.41-1.42L2.59 10H23a1 1 0 1 0 0-2Z'
      />
    </Svg>
  )
);


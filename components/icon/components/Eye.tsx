import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';
import { memo } from 'react';

export const Eye = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} fill={color} {...props}>
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 1.5A12 12 0 0 0 1.32 8.05a2.06 2.06 0 0 0 0 1.9 12 12 0 0 0 21.36 0 2.06 2.06 0 0 0 0-1.9A12 12 0 0 0 12 1.5v0Z'
      />
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z'
      />
    </Svg>
  )
);


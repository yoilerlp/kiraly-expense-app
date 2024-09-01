import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const LogOut = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        d='M19 8V7a2 2 0 00-2-2H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2v-1M11 16h15.83M23.59 11.76l2.82 2.83a2 2 0 010 2.82l-2.82 2.83'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
);

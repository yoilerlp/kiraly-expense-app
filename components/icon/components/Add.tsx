import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Add = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        d='M23 5H9a4 4 0 00-4 4v14a4 4 0 004 4h14a4 4 0 004-4V9a4 4 0 00-4-4zM16 20v-8M20 16h-8'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
);

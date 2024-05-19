import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Food = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} fill='none' {...props} viewBox='0 0 26 32'>
      <Path
        fill={color}
        d='M21.5 0a6.25 6.25 0 0 0-6.25 6.25v2.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-2.5A6.25 6.25 0 0 0 21.5 0ZM11.5 0a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v7.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-7.5A1.25 1.25 0 0 0 11.5 0Z'
      />
    </Svg>
  )
);


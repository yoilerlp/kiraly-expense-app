import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Shooping = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} fill='none' {...props}>
      <Path
        fill={color}
        d='M26.25 20H3.225l1 5a6.25 6.25 0 0 0 6.125 5h9.3a6.25 6.25 0 0 0 6.125-5l1-5h-.525Zm-12.5 6.25a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5Zm5 0a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5ZM26.25 7.5h-2.5V6.25A6.25 6.25 0 0 0 17.5 0h-5a6.25 6.25 0 0 0-6.25 6.25V7.5h-2.5A3.75 3.75 0 0 0 0 11.25v2.5a3.75 3.75 0 0 0 3.75 3.75h22.5A3.75 3.75 0 0 0 30 13.75v-2.5a3.75 3.75 0 0 0-3.75-3.75ZM8.75 6.25A3.75 3.75 0 0 1 12.5 2.5h5a3.75 3.75 0 0 1 3.75 3.75V7.5H8.75V6.25Z'
      />
    </Svg>
  )
);


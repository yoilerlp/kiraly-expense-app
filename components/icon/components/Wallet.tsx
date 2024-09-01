import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Wallet = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill={color} {...props}>
      <Path d='M23.91 8.09A4.6 4.6 0 0023 8H11a1 1 0 010-2h12a5 5 0 00-4-2H9a5 5 0 00-4 2 4.94 4.94 0 00-1 3v14a5 5 0 005 5h14a5 5 0 005-5V13a5 5 0 00-4.09-4.91zM21.24 21c-.08.01-.16.01-.24 0a3 3 0 010-6 2.77 2.77 0 011 .18 3 3 0 01-.76 5.8V21z' />
      <Path d='M21 19a1 1 0 100-2 1 1 0 000 2z' />
    </Svg>
  )
);

import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Warning = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        fill={color}
        d='M16 4.5a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm-1 7a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0v-6Zm1 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
      />
    </Svg>
  )
);


import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Edit = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg
      data-name='Layer 1'
      width={size}
      height={size}
      viewBox='0 0 122.88 121.51'
      fill={color}
      {...props}
    >
      <Path d='M28.66 1.64h30.22L44.46 16.71h-15.8a13.52 13.52 0 00-9.59 4 13.52 13.52 0 00-4 9.59v76.14h76.14a13.5 13.5 0 009.59-4 13.5 13.5 0 004-9.59V77.3l15.07-15.74v31.29a28.6 28.6 0 01-8.41 20.22v.05a28.58 28.58 0 01-20.2 8.39H11.5a11.47 11.47 0 01-8.1-3.37A11.52 11.52 0 010 110V30.3a28.58 28.58 0 018.41-20.21l.05-.09a28.58 28.58 0 0120.2-8.4zM73 76.47l-29.42 6 4.25-31.31L73 76.47zM57.13 41.68L96.3.91a2.74 2.74 0 013.39-.53l22.48 21.76a2.39 2.39 0 01-.19 3.57L82.28 67 57.13 41.68z' />
    </Svg>
  )
);

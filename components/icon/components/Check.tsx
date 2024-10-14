import { memo } from 'react';
import Svg, { Path, G } from 'react-native-svg';

import type { IconProps } from '../index';

export const Check = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 256 256' {...props}>
      <G
        stroke='none'
        strokeWidth={0}
        strokeDasharray='none'
        strokeLinecap='butt'
        strokeLinejoin='miter'
        strokeMiterlimit={10}
        fill='none'
        fillRule='nonzero'
        opacity={1}
      >
        <Path
          d='M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45-20.187 45-45 45zm0-83C24.047 7 7 24.047 7 45s17.047 38 38 38 38-17.047 38-38S65.953 7 45 7z'
          transform='matrix(2.81 0 0 2.81 1.407 1.407)'
          stroke='none'
          strokeWidth={1}
          strokeDasharray='none'
          strokeLinecap='butt'
          strokeLinejoin='miter'
          strokeMiterlimit={10}
          fill={color}
          fillRule='nonzero'
          opacity={1}
        />
        <Path
          d='M42.245 62.755a3.496 3.496 0 01-2.657-1.222L22.121 41.159a3.5 3.5 0 115.314-4.557L42.162 53.78l20.334-25.231a3.5 3.5 0 015.451 4.393L44.97 61.451a3.505 3.505 0 01-2.672 1.304h-.053z'
          transform='matrix(2.81 0 0 2.81 1.407 1.407)'
          stroke='none'
          strokeWidth={1}
          strokeDasharray='none'
          strokeLinecap='butt'
          strokeLinejoin='miter'
          strokeMiterlimit={10}
          fill={color}
          fillRule='nonzero'
          opacity={1}
        />
      </G>
    </Svg>
  )
);


import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Document = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        d='M28 12V25C28 26.3261 27.4732 27.5979 26.5355 28.5355C25.5979 29.4732 24.3261 30 23 30H9C7.67392 30 6.40215 29.4732 5.46447 28.5355C4.52678 27.5979 4 26.3261 4 25V7C4 5.67392 4.52678 4.40215 5.46447 3.46447C6.40215 2.52678 7.67392 2 9 2H18V9C18 9.79565 18.3161 10.5587 18.8787 11.1213C19.4413 11.6839 20.2044 12 21 12H28Z'
        fill={color}
      />
      <Path
        d='M27.91 9.99997H21C20.7348 9.99997 20.4804 9.89461 20.2929 9.70707C20.1054 9.51954 20 9.26518 20 8.99997V2.08997C21.1834 2.29165 22.2742 2.85803 23.12 3.70997L26.29 6.87997C27.1403 7.72693 27.7064 8.8172 27.91 9.99997Z'
        fill={color}
      />
    </Svg>
  )
);

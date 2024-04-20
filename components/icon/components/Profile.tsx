import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Profile = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 32 32' fill={color} {...props}>
      <Path d='M16 16.07C19.3137 16.07 22 13.3837 22 10.07C22 6.7563 19.3137 4.07001 16 4.07001C12.6863 4.07001 10 6.7563 10 10.07C10 13.3837 12.6863 16.07 16 16.07Z' />
      <Path d='M19 18H13C11.1435 18 9.36301 18.7375 8.05025 20.0503C6.7375 21.363 6 23.1435 6 25C6 25.7956 6.31607 26.5587 6.87868 27.1213C7.44129 27.6839 8.20435 28 9 28H23C23.7956 28 24.5587 27.6839 25.1213 27.1213C25.6839 26.5587 26 25.7956 26 25C26 23.1435 25.2625 21.363 23.9497 20.0503C22.637 18.7375 20.8565 18 19 18Z' />
    </Svg>
  )
);


import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Other = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 370.922 370.922'
      fill={color}
      {...props}
    >
      <Path d='m336.344 199.598-45.662-79.09-3.19 22.826-22.791-7.826 45.771 79.279.24.402a31.656 31.656 0 0 1 4.734 16.699c0 17.375-14.016 31.539-31.336 31.777l-.197-.014-.502.018H221.61v-20l-44.311 35 44.311 35v-20h62.121l.172-.002c33.957-.127 61.543-27.793 61.543-61.779a61.63 61.63 0 0 0-9.102-32.29zM87.227 263.67c-11.318 0-21.863-6.09-27.522-15.891-5.658-9.801-5.658-21.98-.002-31.781l27.936-48.385 17.124 10.113-7.604-55.953-52.67 20.356 17.317 10.227L33.723 201c-10.998 19.053-10.998 42.725 0 61.779 11.002 19.053 31.504 30.891 53.504 30.891h79.221l-15-15.586 15-14.414H87.227zM115.428 119.484l42.488-73.596C163.576 36.088 174.121 30 185.44 30c11.316 0 21.863 6.088 27.521 15.889l23.705 41.061L218.7 96.995l52.174 21.596 8.926-55.756-16.944 9.474-23.913-41.419C227.94 11.836 207.44 0 185.44 0c-22.002 0-42.502 11.836-53.504 30.889l-42.488 73.596 22.324-7.598 3.656 22.597z' />
      <Path d='m185.203 227.607 38.877-95.572v-14.428h-77.238v28.967h20.547v-8.914l30.603.059-37.662 89.888zM101.934 321.754c-14.113 0-20.752 6.892-20.752 23.363v2.441c0 16.471 6.639 23.363 20.752 23.363 14.184 0 20.82-6.893 20.82-23.363v-2.441c0-16.471-6.637-23.363-20.82-23.363zm9.293 25.805c0 9.516-1.957 14.824-8.943 14.824h-.629c-6.988 0-9.014-5.309-9.014-14.824v-2.441c0-9.516 2.025-14.824 9.014-14.824h.629c6.986 0 8.943 5.309 8.943 14.824v2.441zM124.85 331.086h12.576v39.043h11.32v-39.043h12.647v-8.539H124.85zM193.672 341.58h-15.861v-19.033h-11.319v47.582h11.319v-20.008h15.861v20.008h11.318v-47.582h-11.318zM212.815 370.129h33.328v-8.539h-22.01v-11.469h18.516v-8.541h-18.516v-10.494h22.01v-8.539h-33.328zM270.737 322.547H252.85v47.582h11.318v-17.08h5.801l7.475 17.08h12.229l-8.594-18.484c4.891-1.768 8.594-5.551 8.594-13.236v-1.221c-.001-12.629-10.063-14.641-18.936-14.641zm7.476 15.555c0 5.369-3.912 6.406-6.986 6.406h-7.059v-13.422h7.059c3.074 0 6.986 1.037 6.986 6.406v.61z' />
    </Svg>
  )
);

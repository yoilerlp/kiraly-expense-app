import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '../index';

export const Transaction = memo(
  ({ size = 24, color = 'black', ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox='0 0 28 22' fill='none' {...props}>
      <Path
        d='M18.1301 12.93V13.93C18.1301 14.5866 18.0007 15.2368 17.7495 15.8434C17.4982 16.4501 17.1299 17.0013 16.6656 17.4656C16.2013 17.9299 15.6501 18.2982 15.0435 18.5494C14.4369 18.8007 13.7867 18.93 13.1301 18.93H9.87007C9.85465 19.4769 9.68997 20.0092 9.39386 20.4692C9.09775 20.9292 8.68147 21.2995 8.19007 21.54C7.78024 21.7448 7.32822 21.851 6.87007 21.85C6.19234 21.8541 5.53322 21.6285 5.00007 21.21L1.29007 18.3C0.928742 18.0196 0.636313 17.6603 0.435145 17.2495C0.233976 16.8387 0.129395 16.3874 0.129395 15.93C0.129395 15.4727 0.233976 15.0213 0.435145 14.6106C0.636313 14.1998 0.928742 13.8405 1.29007 13.56L5.00007 10.65C5.44707 10.2933 5.98673 10.0717 6.55545 10.0115C7.12417 9.95126 7.69826 10.0548 8.21007 10.31C8.8916 10.636 9.41647 11.2184 9.67007 11.93H17.1001C17.2339 11.926 17.3672 11.9489 17.492 11.9974C17.6168 12.0458 17.7306 12.1188 17.8267 12.2121C17.9227 12.3054 17.9991 12.417 18.0512 12.5403C18.1033 12.6636 18.1301 12.7961 18.1301 12.93Z'
        fill={color}
      />
      <Path
        d='M27.8701 6.07001C27.8702 6.52734 27.7657 6.97863 27.5647 7.3894C27.3636 7.80016 27.0713 8.15952 26.7101 8.44001L23.0001 11.35C22.4595 11.7701 21.7947 11.9987 21.1101 12C20.652 12.0009 20.2 11.8948 19.7901 11.69C19.1086 11.364 18.5837 10.7817 18.3301 10.07H10.8701C10.6049 10.07 10.3505 9.96466 10.163 9.77712C9.97547 9.58959 9.87012 9.33523 9.87012 9.07001V8.07001C9.87012 6.74393 10.3969 5.47216 11.3346 4.53448C12.2723 3.5968 13.544 3.07001 14.8701 3.07001H18.1301C18.1423 2.51096 18.3105 1.96644 18.6157 1.4979C18.9209 1.02935 19.351 0.655434 19.8574 0.418337C20.3638 0.181241 20.9264 0.0904046 21.4817 0.156079C22.0371 0.221754 22.563 0.441325 23.0001 0.790015L26.7101 3.70001C27.0713 3.98051 27.3636 4.33987 27.5647 4.75063C27.7657 5.1614 27.8702 5.61269 27.8701 6.07001Z'
        fill={color}
      />
    </Svg>
  )
);

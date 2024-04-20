import * as Icons from './components';

import { SvgProps } from 'react-native-svg';

export type IconName = keyof typeof Icons;

export type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

type IconComponentProps = IconProps & {
  name: IconName;
};

export default function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    throw new Error(`Icon ${name} not found`);
  }

  return <IconComponent {...props} />;
}


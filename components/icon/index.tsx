import { useMemo } from 'react';
import * as Icons from './components';

import { SvgProps } from 'react-native-svg';
import Badge from '../ui/Badge';

export type IconName = keyof typeof Icons;

export type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

type IconComponentProps = IconProps & {
  name: IconName;
};

function Icon({ name, ...props }: IconComponentProps) {
  const IconComponent = useMemo(() => Icons[name], [name]);

  if (!IconComponent) {
    throw new Error(`Icon ${name} not found`);
  }

  return <IconComponent {...props} />;
}

export const WithBadge = (
  props: IconComponentProps & {
    badgeText?: string;
  }
) => {
  return (
    <Badge text={props.badgeText}>
      <Icon {...props} />
    </Badge>
  );
};

Icon.WithBadge = WithBadge;

export default Icon;


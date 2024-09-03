import { ComponentProps, useMemo } from 'react';
import * as Icons from './components';

import { SvgProps } from 'react-native-svg';
import Badge from '../ui/Badge';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export const AllIcons = Icons;

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

export const WithLink = ({
  href,
  activeOpacity = 0.8,
  ...props
}: IconComponentProps & { href: string, activeOpacity?: number }) => {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity activeOpacity={activeOpacity}>
        <Icon {...props} />
      </TouchableOpacity>
    </Link>
  );
};

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

export const WithOpacity = ({
  touchableOpacityProps,
  ...iconProps
}: IconComponentProps & {
  touchableOpacityProps?: ComponentProps<typeof TouchableOpacity>;
}) => {
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      activeOpacity={touchableOpacityProps?.activeOpacity || 0.8}
    >
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
};

Icon.WithBadge = WithBadge;
Icon.WithOpacity = WithOpacity;
Icon.WithLink = WithLink;

export default Icon;

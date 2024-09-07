import { createStyleSheet, useStyles } from 'react-native-unistyles';
import React, { ComponentProps } from 'react';
import Icon, { IconName } from '../icon/index';
import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from 'react-native';

type ButtonProps = Omit<PressableProps, 'children'> & {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large' | 'full';
  text: string;
  isLoading?: boolean;
  iconName?: IconName
  iconSize?: number
};

const Button = React.forwardRef(
  (
    {
      size = 'large',
      variant = 'primary',
      text,
      isLoading = false,
      iconName,
      iconSize = 32,
      ...props
    }: ButtonProps,
    ref: ComponentProps<typeof Pressable>['ref']
  ) => {
    const buttonStyles = useStyles(styles, {
      color: variant,
      size,
    });

    return (
      <Pressable
        {...props}
        ref={ref}
        style={(pressableEvent) => {
          const { style: stylesP } = props;
          const propsStyles =
            typeof stylesP === 'function' ? stylesP(pressableEvent) : stylesP;
          return {
            ...buttonStyles.styles.container({
              presed: pressableEvent.pressed || isLoading,
              disabled: Boolean(props.disabled) || isLoading,
            }),
            ...(propsStyles as any),
          };
        }}
      >
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={
              (buttonStyles?.styles?.text as unknown as any)?.color || 'white'
            }
          />
        )}
        {isLoading ? <ActivityIndicator /> : null}
        <Text style={buttonStyles.styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = createStyleSheet((theme) => ({
  container: ({
    presed,
    disabled,
    flexReverse = false,
  }: {
    presed: boolean;
    disabled?: boolean;
    flexReverse?: boolean;
  }) => {
    return {
      height: 56,
      padding: 8,
      borderRadius: 16,
      flexDirection: flexReverse ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      opacity: presed || disabled ? 0.7 : 1,
      variants: {
        color: {
          primary: {
            backgroundColor: theme.Colors.violet_100,
          },
          secondary: {
            backgroundColor: theme.Colors.violet_20,
          },
        },
        size: {
          small: {
            width: 164,
          },
          large: {
            width: 343,
          },
          full: {
            width: '100%',
          },
        },
      },
    };
  },
  text: {
    ...theme.Typography.Title3,
    variants: {
      color: {
        primary: {
          color: theme.Colors.light_80,
        },
        secondary: {
          color: theme.Colors.violet_100,
        },
      },
    },
  },
}));

export default Button;


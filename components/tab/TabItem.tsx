import React, { ComponentProps } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Typography from '../typography';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '../icon';

type TabItemProps = {
  isActive?: boolean;
  style?: ViewStyle;
  fill?: boolean;
  text: string;
  textProps?: ComponentProps<typeof Typography>;
  iconProps?: ComponentProps<typeof Icon>;

  onPressTab?: () => void;
};

function TabItem({
  isActive = false,
  fill = false,
  text,
  style,
  textProps,
  iconProps,
  onPressTab,
}: TabItemProps) {
  const { styles, theme } = useStyles(StylesSheet);
  return (
    <TouchableOpacity
      style={[styles.container({ isActive, fill }), style]}
      activeOpacity={0.8}
      onPress={onPressTab}
    >
      {iconProps && <Icon {...iconProps} />}
      <Typography
        color={isActive ? theme.Colors.violet_100 : theme.Colors.dark_100}
        type='Body3'
        {...textProps}
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
}

export default TabItem;

const StylesSheet = createStyleSheet((theme) => ({
  container: ({ isActive, fill }: { isActive: boolean; fill: boolean }) => ({
    minWidth: 92,
    height: 42,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: isActive ? theme.Colors.violet_20 : theme.Colors.light_40,
    borderRadius: 24,
    backgroundColor: isActive ? theme.Colors.violet_20 : theme.Colors.light_100,
    alignSelf: fill ? undefined : 'flex-start',
    flexGrow: fill ? 1 : undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }),
}));


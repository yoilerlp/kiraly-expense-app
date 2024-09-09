import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '../icon';

type ScreenHeaderProps = {
  title: string;
  bgColor?: string;
  textColor?: string;
  returnUrl?: string;
  rightIcon?: React.ReactNode;
  onClickGoBack?: () => void;
};

export default function ScreenHeader({
  title,
  bgColor = 'white',
  textColor,
  rightIcon,
  returnUrl,
  onClickGoBack,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { styles, theme } = useStyles(hedaerStyles);
  const tintColor = textColor || theme.Colors.dark_50;
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.rowContent}>
        <Icon
          name='ArrowBack'
          size={24}
          color={tintColor}
          onPress={() => {
            if (onClickGoBack) {
              onClickGoBack();
              return;
            }

            if (returnUrl) {
              router.push(returnUrl as any);
              return;
            }
            router.back();
          }}
        />
        <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
        {rightIcon ? rightIcon : <View />}
      </View>
    </View>
  );
}

const hedaerStyles = createStyleSheet((theme) => ({
  container: {
    height: 64,
    padding: 16,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.Typography.Title3,
    color: theme.Colors.dark_50,
    flexGrow: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

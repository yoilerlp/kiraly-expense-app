import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

type ScreenHeaderProps = {
  title: string;
  bgColor?: string;
  textColor?: string;
};

export default function ScreenHeader({
  title,
  bgColor = 'transparent',
  textColor,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { styles, theme } = useStyles(hedaerStyles);
  const tintColor = textColor || theme.Colors.dark_50;
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.rowContent}>
        <Ionicons
          name='arrow-back-outline'
          size={24}
          color={tintColor}
          onPress={() => router.back()}
        />
        <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
        <View />
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


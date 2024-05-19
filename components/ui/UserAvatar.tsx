import { assets } from '@/constants/assets';
import React from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function UserAvatar() {
  const { styles } = useStyles(UserAvatarStyles);
  return (
    <View style={styles.container}>
      <Image source={assets.images.avatar} style={styles.avatarImg} />
    </View>
  );
}

const UserAvatarStyles = createStyleSheet((theme) => ({
  container: {
    width: 50,
    height: 50,
    borderRadius: 24,
    padding: 3,
    borderWidth: 2,
    borderColor: theme.Colors.violet_100,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
}));


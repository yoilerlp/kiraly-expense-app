import { assets } from '@/constants/assets';
import React from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type UserAvatarProps = {
  containerStyles?: ViewStyle;
  imgUrl?: string;
};

export default function UserAvatar({
  containerStyles,
  imgUrl,
}: UserAvatarProps) {
  const { styles } = useStyles(UserAvatarStyles);
  return (
    <View style={[styles.container, containerStyles]}>
      <Image
        source={imgUrl ? { uri: imgUrl } : assets.images.avatar}
        style={styles.avatarImg}
      />
    </View>
  );
}

const UserAvatarStyles = createStyleSheet((theme) => ({
  container: {
    width: 50,
    height: 50,
    borderRadius: 24,
    // borderWidth: 2,
    // borderColor: theme.Colors.violet_100,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    objectFit: 'cover',
  },
}));

import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import UserAvatar from '../UserAvatar';
import Typography from '@/components/typography';
import Icon from '@/components/icon';
import { User } from '@/interfaces';

type ProfileDetailsProps = {
  onPressEdit?: VoidFunction;
  user: User;
};

export default function  ProfileDetails({
  user,
  onPressEdit,
}: ProfileDetailsProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <View style={styles.container}>
      <UserAvatar
        key={user?.id}
        imgUrl={user?.photo!}
        containerStyles={styles.avatarStyles}
      />
      <View>
        <Typography
          style={{ marginBottom: 8 }}
          color={theme.Colors.light_20}
          type='Body1'
        >
          Username
        </Typography>
        <Typography
          color={theme.Colors.dark_75}
          type='Title2'
          numberOfLines={1}
          ellipsizeMode='tail'
          adjustsFontSizeToFit
        >
          {user?.name} {user?.lastName}
        </Typography>
      </View>
      <Icon.WithOpacity
        touchableOpacityProps={{
          activeOpacity: 0.8,
          style: styles.iconContainer,
          onPress: onPressEdit,
        }}
        name='Edit'
        size={24}
      />
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  avatarStyles: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  iconContainer: {
    marginLeft: 'auto',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
}));

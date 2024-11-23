import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import SafeAreasSetting from '../../../components/SafeAreasSetting';
import ProfileDetails from '@/components/ui/profile/ProfileDetails';
import ProfileActionItem from '@/components/ui/profile/ProfileActionItem';
import { IconName } from '@/components/icon';
import { Stack, useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import { CustomBottomSheetComp } from '@/components';
import BottomSheetDecision from '@/components/bottomSheet/BottomSheetDecision';
import ScreenHeader from '@/components/header';

const profileActions: {
  text: string;
  icon: IconName;
  url: string;
  isLogout?: boolean;
}[] = [
  {
    text: 'Profile',
    icon: 'Profile',
    url: '/profile/update-profile',
    isLogout: false,
  },
  {
    text: 'Loans',
    icon: 'Income',
    url: '/loans/',
    isLogout: false,
  },
  {
    text: 'Transfers',
    icon: 'Transfer',
    url: '/transfer/',
    isLogout: false,
  },
  {
    text: 'Accounts',
    icon: 'Wallet',
    url: '/account',
    isLogout: false,
  },
  {
    text: 'Categories',
    icon: 'Wallet',
    url: '/category',
    isLogout: false,
  },
  {
    text: 'Logout',
    icon: 'LogOut',
    url: '/auth/login',
    isLogout: true,
  },
];

export default function ProfileView() {
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState(-1);

  const auth = useAuth();

  const { styles, theme } = useStyles(StylesSheet);

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ScreenHeader
              title='Profile'
              bgColor={theme.Colors.violet_100}
              textColor='white'
            />
          ),
        }}
      /> */}
      <SafeAreasSetting
        statusBarBgColor={theme.Colors.violet_100}
        bottomBgColor={theme.Colors.violet_100}
        statusBarProps={{ style: 'auto' }}
      />
      <View style={styles.section}>
        <ProfileDetails
          user={auth.user!}
          onPressEdit={() => router.push('/profile/update-profile')}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.actionsContainer}>
          {profileActions?.map((action, idx) => (
            <ProfileActionItem
              key={`profile-action-${idx}`}
              text={action.text}
              icon={action.icon}
              onPress={() => {
                if (action.isLogout) {
                  setBottomSheetIndex(0);
                } else {
                  router.push(action.url as any);
                }
              }}
              isLogout={action.isLogout}
            />
          ))}
        </View>
      </View>
      <CustomBottomSheetComp
        index={bottomSheetIndex}
        onChange={setBottomSheetIndex}
        snapPoints={['25%']}
      >
        <BottomSheetDecision
          isLoading={false}
          title='Logout?'
          subtitle='Are you sure do you wanna logout?'
          onCancel={() => {
            setBottomSheetIndex(-1);
          }}
          onConfirm={() => {
            auth.logOut();
          }}
        />
      </CustomBottomSheetComp>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F6F6F6',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  actionsContainer: {
    backgroundColor: theme.Colors.light_100,
    borderRadius: 24,
    overflow: 'hidden',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
}));


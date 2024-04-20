import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@/components';
import { setStorageItemAsync } from '@/utils/storage';
import { Tabs, useRouter } from 'expo-router';

export default function HomeView() {
  const router = useRouter();
  return (
    <View>
      {/* <Tabs.Screen name='home/test' /> */}
      <Text>PROFILE</Text>
      <Button
        onPress={async () => {
          await setStorageItemAsync('token', null);
          router.navigate('(auth)/login');
        }}
        text='logOut'
      />
    </View>
  );
}


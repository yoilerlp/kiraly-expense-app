import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@/components';
import { setStorageItemAsync } from '@/utils/storage';
import { Tabs, useRouter } from 'expo-router';
import IconList from '@/components/ui/IconList';

export default function HomeView() {
  const router = useRouter();
  return (
    <View>
      {/* <Tabs.Screen name='home/test' /> */}
      <IconList />
    </View>
  );
}


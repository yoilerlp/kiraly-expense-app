import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Colors } from '@/theme/Colors';

export default function LoadingSpinner() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={Colors.violet_100} size={'large'} />
    </View>
  );
}


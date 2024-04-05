import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React from 'react';

export default function Select() {
  return (
    <View>
      <Text>Select</Text>
      <Picker>
        <Picker.Item label='Java' value='java' />
        <Picker.Item label='JavaScript' value='js' />
      </Picker>
    </View>
  );
}

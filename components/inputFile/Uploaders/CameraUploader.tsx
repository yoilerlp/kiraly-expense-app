import { View, Text } from 'react-native';
import React from 'react';
import LoadFileTypeItem from '../LoadFileTypeItem';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export default function CameraUploader() {
  const takePicture = async () => {
    try {
      const permissions = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissions.granted) {
        Toast.show({
          type: 'info',
          text1: 'Info',
          text2: 'Camera Permission is required',
        });
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoadFileTypeItem icon='Camera' title='Camera' onPress={takePicture} />
  );
}


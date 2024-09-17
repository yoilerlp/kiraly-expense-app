import { View, Text } from 'react-native';
import React from 'react';
import LoadFileTypeItem from '../LoadFileTypeItem';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { LoadedFile, UploaderResult } from '@/interfaces';

type Props = UploaderResult;
export default function CameraUploader({ onResult }: Props) {
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

      if (!result.canceled) {
        const assetDetails = result.assets[0];
        if (assetDetails && assetDetails.uri) {
          const {
            uri,
            fileName: name,
            mimeType,
            fileSize: size,
          } = assetDetails;
          const fileResult: LoadedFile = {
            fileName: name || 'New File',
            type: 'image/*',
            uri: uri,
            size: size || 0,
            mimeType: mimeType!,
          };
          onResult?.(fileResult);
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error while loading document',
      });
      console.log(error);
    }
  };

  return (
    <LoadFileTypeItem icon='Camera' title='Camera' onPress={takePicture} />
  );
}


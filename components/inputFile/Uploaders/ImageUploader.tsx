import { View, Text } from 'react-native';
import React, { useState } from 'react';
import LoadFileTypeItem from '../LoadFileTypeItem';
import * as ImagePicker from 'expo-image-picker';
import { fetchFileFromUri } from '@/utils/files';
import Toast from 'react-native-toast-message';
import { LoadedFile, UploaderResult } from '@/interfaces/file';

type Props = UploaderResult;

export default function ImageUploader({ onResult, renderComponent }: Props) {
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
        // allowsEditing: false,
        //   aspect: [4, 3],
      });

      if (!result.canceled) {
        const assetDetails = result.assets[0];
        if (assetDetails && assetDetails.uri) {
          const { uri, fileName, mimeType, fileSize, type } = assetDetails;

          const fileResult: LoadedFile = {
            fileName: fileName || 'New File',
            type: type || '',
            uri: uri,
            size: fileSize || 0,
            mimeType: mimeType!,
            base64: assetDetails.base64 || '',
          };
          onResult?.(fileResult);
        }
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error while loading image',
      });
    }
  };

  if (renderComponent) {
    return renderComponent(pickImage);
  }

  return <LoadFileTypeItem icon='Image' title='Image' onPress={pickImage} />;
}

import { LoadedFile } from '@/interfaces/file';
import { Platform } from 'react-native';

export const fetchFileFromUri = async (uri: string) => {
  const response = await fetch(uri);
  const blobR = await response.blob();
  return blobR;
};

export const convertLoadedFilesToFiles = async (files: LoadedFile[]) => {
  const filesMapped = files?.map((file) => {
    const uri =
      Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;
    return {
      uri,
      type: file.mimeType,
      name: file.fileName,
    };
  });

  return filesMapped;
};


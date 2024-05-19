import LoadFileTypeItem from '../LoadFileTypeItem';
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';
import { LoadedFile, UploaderResult } from '@/interfaces/file';

type Props = UploaderResult;

export default function DocumentUploader({ onResult }: Props) {
  const pickDocument = async () => {
    const documentType = 'application/pdf';

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: documentType,
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const assetDetails = result.assets[0];
        if (assetDetails && assetDetails.uri) {
          const { uri, name, mimeType, size } = assetDetails;
          const fileResult: LoadedFile = {
            fileName: name || 'New File',
            type: documentType,
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
    }
  };

  return (
    <LoadFileTypeItem icon='Document' title='Document' onPress={pickDocument} />
  );
}


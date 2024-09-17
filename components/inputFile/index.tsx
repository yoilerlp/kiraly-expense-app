import {
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Icon from '../icon';
import { Colors } from '@/theme/Colors';
import Typography from '../typography';
import FileItem from './FileItem';
import ImageUploader from './Uploaders/ImageUploader';
import { LoadedFile } from '@/interfaces/file';
import CameraUploader from './Uploaders/CameraUploader';
import DocumentUploader from './Uploaders/DocumentUploader';

type InputFileProps = {
  files?: LoadedFile[];
  onChange?: (file: LoadedFile) => void;
  onDeleteFile?: (file: LoadedFile, idx: number) => void;
};

export default function InputFile({
  files = [],
  onChange,
  onDeleteFile,
}: InputFileProps) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const { styles } = useStyles(StylesSheet);

  const hasFiles = files?.length > 0;

  const handleAddFile = (newFile: LoadedFile) => {
    onChange && onChange(newFile);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container({ hasFiles })}>
        {hasFiles ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.files}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces
              alwaysBounceHorizontal
            >
              {files?.map((file, idx) => (
                <FileItem
                  key={`${idx}-${file.fileName}`}
                  file={file}
                  onDelete={() => {
                    onDeleteFile && onDeleteFile(file, idx);
                  }}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}
            >
              <Typography
                color={Colors.violet_100}
                style={{ textAlign: 'center' }}
                type='Small'
              >
                Add more files
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.4}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            onPress={() => setModalVisible(true)}
          >
            <Icon name='Attachment' color={Colors.light_20} size={32} />
            <Typography fontSize={16} color={Colors.light_20} type='Body1'>
              Add attachment
            </Typography>
          </TouchableOpacity>
        )}

        <Modal
          transparent
          visible={modalVisible}
          animationType='fade'
          statusBarTranslucent
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.sheetConteiner}>
              <View style={styles.sheetHeader}>
                <Typography type='Title3'>
                  Select attachment from your device
                </Typography>
                <Icon
                  name='Close'
                  color={Colors.red_100}
                  size={16}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View style={styles.sheetContent}>
                <CameraUploader
                  onResult={(file) => {
                    handleAddFile(file);
                  }}
                />
                <ImageUploader
                  onResult={(file) => {
                    handleAddFile(file);
                  }}
                />
                <DocumentUploader
                  onResult={(file) => {
                    handleAddFile(file);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* <BottomSheetComp
          index={bottomSheetIndex}
          onChange={setBottomSheetIndex}
          snapPoints={['20%']}
        >
          <View style={styles.sheetContent}>
            <CameraUploader />
            <ImageUploader
              onResult={(file) => {
                handleAddFile(file);
              }}
            />
            <DocumentUploader
              onResult={(file) => {
                handleAddFile(file);
              }}
            />
          </View>
        </BottomSheetComp> */}
      </View>
    </>
  );
}

// Styles

const StylesSheet = createStyleSheet((theme) => ({
  container: ({ hasFiles = false }: { hasFiles?: boolean }) => ({
    height: 60,
    maxHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: hasFiles ? 'flex-start' : 'center',
    alignItems: 'center',
    gap: 10,
    ...(hasFiles
      ? {
          borderWidth: 0,
          height: 140,
        }
      : {}),
  }),
  files: {
    flex: 1,
    gap: 8,
    paddingVertical: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetConteiner: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
  },
}));


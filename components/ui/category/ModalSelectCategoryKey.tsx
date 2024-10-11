import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import FetchWrapper from '@/components/FetchWrapper';
import { categoriesColorsConfig } from '@/utils';

const ModalSelectCategoryKey = () => {
  const { styles, theme } = useStyles(StylesSheet);

  const onClose = () => {};
  const visible = true;

  return (
    <Modal
      animationType='slide'
      visible={visible}
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.itemsContainer}>
          {}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalSelectCategoryKey;

const StylesSheet = createStyleSheet((theme) => ({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  itemsContainer: {
    gap: 8,
    marginBottom: 8,
    paddingBottom: 16,
  },
}));


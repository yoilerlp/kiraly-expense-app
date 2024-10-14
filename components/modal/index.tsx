import { View, Modal } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type ModalBaseProps = {
  onClose: () => void;
  open: boolean;
};

const ModalBase = ({
  onClose,
  open,
  children,
}: PropsWithChildren<ModalBaseProps>) => {
  const { styles } = useStyles(StylesSheet);

  return (
    <Modal
      animationType='fade'
      visible={open}
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.itemsContainer}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalBase;

const StylesSheet = createStyleSheet((theme) => ({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  itemsContainer: {
    flex: 0.5,
    backgroundColor: theme.Colors.light_100,
    padding: 24,
    borderRadius: 24,
  },
}));


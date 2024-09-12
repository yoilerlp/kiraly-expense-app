import React, { useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import Typography from '../typography';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import CustomCheckBox from '../checkbox';
import Button from '../button';
import Icon from '../icon';

type ItemList = {
  label: string;
  value: string;
  checked?: boolean;
};
type ModalSelectCategoryProps = {
  open: boolean;
  items: ItemList[];
  title?: string;
  onSave?: (items: ItemList[]) => void;
};

function ModalSelectCategory({
  open,
  items,
  title = 'Select Category',
  onSave,
}: ModalSelectCategoryProps) {
  const [list, setList] = useState(() =>
    items?.map((item) => ({
      ...item,
      checked: item.checked ?? false,
    }))
  );

  const { styles, theme } = useStyles(StylesSheet);

  const toogleItem = (idx: number) => {
    const newList = [...list];
    newList[idx] = {
      ...newList[idx],
      checked: !newList[idx].checked,
    };
    setList(newList);
  };

  return (
    <Modal visible={open} transparent animationType='fade'>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Typography style={{ marginBottom: 8 }} center type='Title3'>
            {title}
          </Typography>
          <ScrollView contentContainerStyle={styles.itemsContainer}>
            {list.map((item, idx) => (
              <View style={styles.item} key={`select_category_${item.label}`}>
                <Typography type='Body2'>{item.label}</Typography>
                <CustomCheckBox
                  style={{ borderRadius: 6 }}
                  value={item.checked}
                  onValueChange={() => toogleItem(idx)}
                />
              </View>
            ))}
          </ScrollView>
          <Button text='Save' onPress={() => onSave?.(list)} size='full' />
        </View>
      </View>
    </Modal>
  );
}

export default ModalSelectCategory;

const StylesSheet = createStyleSheet((theme) => ({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  modalBody: {
    flex: 0.5,
    backgroundColor: theme.Colors.light_100,
    padding: 24,
    borderRadius: 24,
  },
  itemsContainer: {
    gap: 8,
    marginBottom: 8,
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },
}));


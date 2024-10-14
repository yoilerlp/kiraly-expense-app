import { View, SectionList, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import Icon, { AllIcons } from '@/components/icon';
import ModalBase, { ModalBaseProps } from '@/components/modal';

type ModalSelectIcon = ModalBaseProps & {
  selectIcon?: string;
  onSelectIcon?: (color: string) => void;
};

const ModalSelectIcon = ({
  onClose,
  open: visible,
  selectIcon,
  onSelectIcon,
}: ModalSelectIcon) => {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <ModalBase onClose={onClose} open={visible}>
      <Typography center type='Title3'>
        Select an Icon
      </Typography>
      <FlatList
        data={Object.keys(AllIcons)}
        renderItem={({ item }) => {
          const isSelected = selectIcon === item;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconRow(isSelected)}
              onPress={() => onSelectIcon?.(item)}
            >
              <Typography
                color={isSelected ? theme.Colors.white : theme.Colors.green_100}
                type='Body1'
              >
                {item}
              </Typography>
              <Icon
                size={30}
                name={item! as keyof typeof AllIcons}
                color={isSelected ? theme.Colors.white : theme.Colors.green_100}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </ModalBase>
  );
};

export default ModalSelectIcon;

const StylesSheet = createStyleSheet((theme) => ({
  listContainer: {
    gap: 8,
  },
  iconRow: (isSelected: boolean) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.Colors.green_100,
    ...(isSelected && {
      backgroundColor: theme.Colors.green_100,
    }),
  }),
}));


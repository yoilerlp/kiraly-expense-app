import { View, SectionList, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import Icon from '@/components/icon';
import { ThemeColors } from '@/theme/Colors';
import ModalBase, { ModalBaseProps } from '@/components/modal';

type ModalSelectColorProps = ModalBaseProps & {
  title?: string;
  selectColor?: string;
  onSelectColor?: (color: string) => void;
};

const ModalSelectColor = ({
  onClose,
  open: visible,
  title = 'Select a Color',
  selectColor,
  onSelectColor,
}: ModalSelectColorProps) => {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <ModalBase onClose={onClose} open={visible}>
      <Typography center type='Title3'>
        {title}
      </Typography>
      <SectionList
        sections={[
          {
            title: 'Theme Colors',
            data: Object.values(ThemeColors) as string[],
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.colorRow(item)}
            onPress={() => onSelectColor?.(item)}
          >
            <Typography type='Body1'>{item}</Typography>
            {item === selectColor ? <Icon name='Check' color='black' /> : null}
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Typography style={{ marginVertical: 8 }} type='Title2'>
            {title}
          </Typography>
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </ModalBase>
  );
};

export default ModalSelectColor;

const StylesSheet = createStyleSheet((theme) => ({
  listContainer: {
    gap: 8,
  },
  colorRow: (color: string) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: color,
    borderRadius: 8,
  }),
}));


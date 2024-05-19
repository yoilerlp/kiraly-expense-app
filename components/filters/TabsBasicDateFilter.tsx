import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SelectOption } from '@/interfaces';
import PillTab from '../ui/PillTab';

type TabsBasicDateFilterProps = {
  list: SelectOption[];
  activeTab: string;
  onPressTab: (value: string) => void;
};

export default function TabsBasicDateFilter({
  list,
  activeTab,
  onPressTab,
}: TabsBasicDateFilterProps) {
  const { styles } = useStyles(TabsBasicDateFilterStyles);

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <PillTab
          key={item.value}
          label={item.label}
          color='yellow'
          size='medium'
          onPressTab={() => onPressTab(item.value)}
          isActive={activeTab === item.value}
        />
      ))}
    </View>
  );
}

const TabsBasicDateFilterStyles = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 4,
    borderBottomWidth: 1,
    borderColor: theme.Colors.light_80,
    paddingVertical: 2,
  },
}));


import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon, { AllIcons } from '../icon';
import { categoriesColorsConfig } from '@/utils';

export default function IconList() {
  return (
    <ScrollView>
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 10 }}
      >
        {Object.keys(AllIcons).map((key) => {
          return (
            <View
              key={key}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
              }}
            >
              <Icon name={key as any} size={32} color='red' />
              <Text>{key}</Text>
            </View>
          );
        })}
      </View>
      <Text>CATEGORY LIST</Text>

      <View>
        {Object.keys(categoriesColorsConfig).map((key, idx) => {
          const item =
            categoriesColorsConfig[key as keyof typeof categoriesColorsConfig]!;
          return (
            <View
              key={`${item.name}_${idx}`}
              style={{
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                backgroundColor: item.containerColor,
              }}
            >
              <Icon name={item.name as any} size={32} color={item.iconColor} />
              <Text>{key}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}


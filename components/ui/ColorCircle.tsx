import React from 'react';
import { View } from 'react-native';

function ColorCircle({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: color,
      }}
    />
  );
}

export default ColorCircle;


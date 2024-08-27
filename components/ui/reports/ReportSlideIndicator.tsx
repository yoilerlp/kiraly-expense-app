import { Text, View } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ReportSlideIndicatorsProps = {
  slideItems: string[];
  currentSlide: string;
};

export default function ReportSlideIndicators({
  slideItems,
  currentSlide,
}: ReportSlideIndicatorsProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <View style={styles.container}>
      {slideItems.map((item, index) => (
        <View
          key={`slide-indicator-${index}-${item}`}
          style={[styles.indicator(item === currentSlide)]}
        />
      ))}
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  indicator: (isActive = false) => {
    return {
      backgroundColor: isActive
        ? theme.Colors.light_100
        : 'rgba(255,255,255,0.24)',
      height: 4,
      borderRadius: 2,
      flexGrow: 1,
    };
  },
}));

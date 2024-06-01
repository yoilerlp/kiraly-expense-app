import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = PropsWithChildren<{
  bgColor?: string;
  textColor?: string;
  text?: string;
}>;

function Badge({ text, bgColor, textColor = 'white', children }: Props) {
  const { styles } = useStyles(stylesSheet);

  if (!text) return children;

  return (
    <View style={styles.container}>
      <View
        style={styles.decorator({
          bgColor,
        })}
      >
        <Text style={[{ color: textColor }, styles.text]}>{text}</Text>
      </View>
      {children}
    </View>
  );
}

const Decoration = () => {
  return (
    <View style={{}}>
      <Text style={{ color: 'orange', fontSize: 12, textAlign: 'center' }}>
        1
      </Text>
    </View>
  );
};

export default Badge;

const stylesSheet = createStyleSheet((theme) => ({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  decorator: ({ bgColor = theme.Colors.violet_100 }: { bgColor?: string }) => ({
    position: 'absolute',
    width: '30%',
    height: '30%',
    minHeight: 16,
    minWidth: 16,
    top: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: bgColor,
    borderRadius: 8,
  }),
  text: {
    fontSize: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
}));


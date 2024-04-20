import Icon from '@/components/icon';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const { width, height } = Dimensions.get('window');

export default function ActionButton() {
  const [showFloatingLinks, setShowFloatingLinks] = useState(true);

  const { styles, theme } = useStyles(ActionButtonStyles);

  const floatingOpacity = 0.8;

  const floatingIconSize = 40;

  return (
    <>
      {showFloatingLinks && (
        <LinearGradient
          colors={['rgba(139, 80, 255, 0)', 'rgba(139, 80, 255, 0.24)']}
          style={styles.blurView}
        >
          <TouchableOpacity
            activeOpacity={floatingOpacity}
            style={[styles.floatingLink, styles.floatingTop]}
          >
            <Icon
              name='Transfer'
              size={floatingIconSize}
              color={theme.Colors.light_80}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={floatingOpacity}
            style={[styles.floatingLink, styles.floatingLeft]}
          >
            <Icon
              name='Income'
              size={floatingIconSize}
              color={theme.Colors.light_80}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={floatingOpacity}
            style={[styles.floatingLink, styles.floatingRight]}
          >
            <Icon
              name='Expense'
              size={floatingIconSize}
              color={theme.Colors.light_80}
            />
          </TouchableOpacity>
        </LinearGradient>
      )}

      <TouchableOpacity
        activeOpacity={floatingOpacity}
        onPress={() => setShowFloatingLinks(!showFloatingLinks)}
        style={styles.container(showFloatingLinks)}
      >
        {showFloatingLinks && <View style={[styles.mask]}></View>}
        <View
          style={[
            styles.bottomBall,
            {
              ...(!showFloatingLinks && {
                transform: [{ rotate: '45deg' }],
              }),
            },
          ]}
        >
          <Icon name='Close' size={24} color={theme.Colors.light_80} />
        </View>
      </TouchableOpacity>
    </>
  );
}
const ActionButtonStyles = createStyleSheet((theme) => {
  const ACTION_WIDTH = 90;
  const blurHeight = height * 0.6;
  const linkBottomSize = ACTION_WIDTH - 16;
  return {
    container: (isActive: boolean) => {
      return {
        width: ACTION_WIDTH,
        height: ACTION_WIDTH,
        position: 'absolute',
        bottom: 15,
        left: width / 2 - ACTION_WIDTH / 2,
        borderRadius: ACTION_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 10,
      };
    },
    bottomBall: {
      justifyContent: 'center',
      alignItems: 'center',
      width: linkBottomSize,
      height: linkBottomSize,
      borderRadius: 100,
      backgroundColor: theme.Colors.violet_100,
    },
    blurView: {
      position: 'absolute',
      left: 0,
      top: -blurHeight,
      width: width,
      height: blurHeight,
      zIndex: 5,
    },
    floatingLink: {
      position: 'absolute',
      width: linkBottomSize,
      height: linkBottomSize,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingLeft: {
      left: width / 2 - ACTION_WIDTH / 2 - 80,
      bottom: 25,
      backgroundColor: theme.Colors.green_100,
    },
    floatingRight: {
      bottom: 25,
      left: width / 2 - ACTION_WIDTH / 2 + 80,
      backgroundColor: theme.Colors.red_100,
    },
    floatingTop: {
      bottom: ACTION_WIDTH + 15,
      left: width / 2 - ACTION_WIDTH / 2,
      backgroundColor: theme.Colors.blue_100,
    },
    mask: {
      position: 'absolute',
      height: ACTION_WIDTH,
      width: ACTION_WIDTH,
      top: 25,
      backgroundColor: 'rgba(139, 80, 255, 0.24)',
    },
  };
});


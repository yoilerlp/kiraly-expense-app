import { View } from 'react-native';
import React, { ComponentProps, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import TabBarItem from './TabBarItem';
import ActionButton from './ActionButton';
import { IconName } from '@/components/icon';

type TabsProps = Pick<ComponentProps<typeof Tabs>, 'tabBar'>;

type TabBarProps = Parameters<NonNullable<TabsProps['tabBar']>>[0];

type TabScreenData = {
  key: string;
  title: string;
  iconName: IconName;
};

const tabBarItemsLeft: TabScreenData[] = [
  {
    key: 'home',
    title: 'Home',
    iconName: 'Home',
  },
  {
    key: 'transaction',
    title: 'Transaction',
    iconName: 'Transaction',
  },
];

const tabBarItemsRight: TabScreenData[] = [
  {
    key: 'budget',
    title: 'Budget',
    iconName: 'Budget',
  },
  {
    key: 'profile',
    title: 'Profile',
    iconName: 'Profile',
  },
];

export default function TabBar({ navigation, state }: TabBarProps) {
  const { styles } = useStyles(TabBarStyles);

  console.log({
    state,
  })

  const [itemsLeft, itemsRight] = useMemo(() => {
    function createSubArrays(array: any[], chunkSize: number) {
      const subArrays = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        subArrays.push(array.slice(i, i + chunkSize));
      }
      return subArrays;
    }

    const tabItemsRendered = [...tabBarItemsLeft, ...tabBarItemsRight].map(
      (item) => {
        const routeIndexByName = state.routeNames.findIndex(
          (name) => name === item.key
        );
        const isActive = routeIndexByName === state.index;

        return (
          <TabBarItem
            key={item.key}
            title={item.title}
            icon={item.iconName}
            isActive={isActive}
            onPress={() => navigation.navigate(item.key)}
          />
        );
      }
    );

    return createSubArrays(tabItemsRendered, 2);
  }, [state]);

  return (
    <Animated.View style={styles.wrapper}>
      <Animated.View style={styles.container}>
        <View style={styles.itemsSection}>{itemsLeft}</View>
        <ActionButton />
        <View
          style={{
            width: 120,
          }}
        />
        <View style={[styles.itemsSection, styles.lastSection]}>
          {itemsRight}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const TabBarStyles = createStyleSheet((theme) => ({
  wrapper: {
    height: 80,
    backgroundColor: theme.Colors.light_100,
  },
  container: {
    height: 80,
    flexDirection: 'row',
    backfaceVisibility: 'hidden',
    paddingHorizontal: 26,
    paddingVertical: 11,
    justifyContent: 'space-evenly',
    backgroundColor: theme.Colors.light_80,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    gap: 5,
  },
  itemsSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    gap: 25,
    borderTopRightRadius: 24,
  },
  lastSection: {
    justifyContent: 'flex-end',
    borderTopLeftRadius: 24,
  },
}));


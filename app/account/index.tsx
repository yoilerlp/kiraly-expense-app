import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import FetchWrapper from '@/components/FetchWrapper';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import useUserAccounts from '@/hooks/data/useUserAccounts';
import { Icon, Typography } from '@/components';
import AccountCard from '@/components/ui/account/AccountCard';

export default function AccountsView() {
  const { styles, theme } = useStyles(StylesSheet);

  const { data, isLoading, error } = useUserAccounts();

  return (
    <FetchWrapper loading={isLoading} error={error}>
      <SafeAreasSetting
        statusBarBgColor={theme.Colors.violet_100}
        statusBarProps={{ style: 'auto' }}
      />
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            header: () => (
              <ScreenHeader
                title='Accounts'
                textColor={theme.Colors.light_100}
                bgColor={theme.Colors.violet_100}
                rightIcon={
                  <Icon.WithLink
                    href='/addAccount'
                    name='Add'
                    size={32}
                    color={theme.Colors.light_100}
                  />
                }
              />
            ),
          }}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AccountCard account={item} key={item.id} />
          )}
        />
      </View>
    </FetchWrapper>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.light_100,
    paddingVertical: 24,
  },
}));

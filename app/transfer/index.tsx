import { View, Text, FlatList } from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import { IFilterTransferParams, Transfer } from '@/interfaces';
import useTransfers from '@/hooks/data/useTranfers';
import { LoadingSpinner, Typography } from '@/components';
import TransferCard from '@/components/ui/transfer/TransferCard';

export default function TransferListView() {
  const { styles, theme } = useStyles(StylesSheet);

  const [transfersParams, settransfersParams] = useState<IFilterTransferParams>(
    {
      page: 1,
      limit: 10,
    }
  );

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useTransfers(transfersParams);

  const transferList = useMemo(() => {
    const alltransfersLoaded =
      data?.pages?.reduce((acc, page) => {
        return [...acc, ...(page?.rows || [])];
      }, [] as Transfer[]) || [];

    return alltransfersLoaded;
  }, [data]);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) return;
    fetchNextPage();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title='Transfers'
                bgColor={theme.Colors.blue_100}
                textColor={theme.Colors.light_100}
              />
            );
          },
        }}
      />

      <SafeAreasSetting
        statusBarBgColor={theme.Colors.blue_100}
        bottomBgColor={theme.Colors.light_100}
        statusBarProps={{
          style: 'auto',
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={transferList}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransferCard transfer={item} />}
          ListEmptyComponent={() => (
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Typography>No Transfers found</Typography>
              )}
            </View>
          )}
          ListFooterComponent={
            <>{isFetchingNextPage ? <LoadingSpinner /> : null}</>
          }
        />
      </View>
    </>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {},
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}));


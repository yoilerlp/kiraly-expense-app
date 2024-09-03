import React, { PropsWithChildren } from 'react';
import { SectionList, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import TransactionCard from './TransactionCard';
import Typography from '@/components/typography';
import LoadingSpinner from '@/components/loaders';
import { Transaction } from '@/interfaces';

type TransactionSectionsProps = PropsWithChildren<{
  sectinosData: {
    title: string;
    data: Transaction[];
  }[];
  hasNextPage?: boolean;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  handleLoadMore?: () => void;
}>;

function TransactionSections({
  children,
  sectinosData,
  handleLoadMore,
  hasNextPage,
  isLoading = false,
  isFetchingNextPage,
}: TransactionSectionsProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <SectionList
      contentContainerStyle={styles.container}
      style={{ backgroundColor: theme.Colors.light_100 }}
      sections={sectinosData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TransactionCard transaction={item} />}
      onEndReached={hasNextPage ? handleLoadMore : null}
      onEndReachedThreshold={0.1}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeaderContainer}>
          <Typography fontSize={18} type='Title3'>
            {title}
          </Typography>
        </View>
      )}
      ListHeaderComponent={() => <>{children}</>}
      SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListEmptyComponent={() => (
        <View style={styles.loaderContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Typography>No transactions found</Typography>
          )}
        </View>
      )}
      ListFooterComponent={
        <>{isFetchingNextPage ? <LoadingSpinner /> : null}</>
      }
    />
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.Colors.light_100,
    paddingHorizontal: theme.margins.xl,
  },
  sectionHeaderContainer: {
    // marginBottom: 8,
  },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}));

export default TransactionSections;

import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import { Link } from 'expo-router';
import Button from '@/components/button';
import { BasicDateFiltersEnum } from '@/utils';

type ExpenseSlideQuoteProps = {
  quoteData: {
    quote: string;
    author: string;
  };
  currentTab?: string;
};

export default function ExpenseSlideQuote({
  quoteData,
  currentTab,
}: ExpenseSlideQuoteProps) {
  const { styles, theme } = useStyles(StylesSheet);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      {quoteData?.quote ? (
        <View>
          <Typography
            color={theme.Colors.light_100}
            type='Title1'
            style={{ textAlign: 'auto', marginBottom: 24 }}
          >
            “{quoteData.quote}”
          </Typography>

          <Typography color={theme.Colors.light_100} type='Title2'>
            -{quoteData.author}
          </Typography>
        </View>
      ) : (
        <Typography color={theme.Colors.light_100} type='Title3' center>
          Sorry, there's no quote.
        </Typography>
      )}
      <Link
        href={{
          pathname: '/reports/financial',
          params: {
            filter: currentTab ?? BasicDateFiltersEnum.MONTH,
          },
        }}
        asChild
      >
        <Button variant='secondary' size='full' text='See the full detail' />
      </Link>
    </ScrollView>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 64,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
}));


import {
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ReportSlideIndicators from '@/components/ui/reports/ReportSlideIndicator';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import ExpenseSlideContent from '@/components/ui/reports/ExpenseSlideContent';
import useBasicExpensesReport from '@/hooks/data/useBasicExpensesReport';
import {
  BasicDateFiltersEnum,
  generateMinAndMaxDateBasedOnFilters,
} from '@/utils';
import { useLocalSearchParams } from 'expo-router';
import ExpenseSlideBudgetCard from '@/components/ui/reports/ExpenseSlideBudgetCard';
import useRandomQuote from '@/hooks/data/useRandomQuote';
import ExpenseSlideQuote from '@/components/ui/reports/ExpenseSlideQuote';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';

const slideItems = ['expense', 'income', 'budget', 'quote'] as const;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const slideHeightActionOffset = screenHeight * 0.2;

const slideWidthActionOffset = screenWidth * 0.3;

export default function ReportSlides() {
  const { styles, theme } = useStyles(StylesSheet);

  const [currentSlideIndice, setCurrentSlideIndice] = useState(0);

  const { filter = BasicDateFiltersEnum.MONTH } = useLocalSearchParams<{
    filter: string;
  }>();

  const { minDate, maxDate } = generateMinAndMaxDateBasedOnFilters(
    filter as any
  );

  const { data, isLoading, error } = useBasicExpensesReport({
    minDate: minDate!,
    maxDate: maxDate!,
  });

  const { data: randomQuote } = useRandomQuote({ category: 'business' });

  const currentSlide = slideItems[currentSlideIndice];

  const getBgColorBasedOnSlide = (slide: (typeof slideItems)[number]) => {
    switch (slide) {
      case 'expense':
        return theme.Colors.red_100;
      case 'income':
        return theme.Colors.green_100;
      case 'budget':
        return theme.Colors.violet_100;
      case 'quote':
        return theme.Colors.violet_100;
    }
  };

  const handleNextSlice = () => {
    if (currentSlideIndice < slideItems.length - 1) {
      setCurrentSlideIndice(currentSlideIndice + 1);
    }
  };

  const handlePreviousSlice = () => {
    if (currentSlideIndice > 0) {
      setCurrentSlideIndice(currentSlideIndice - 1);
    }
  };

  // detect on what part of the screen was pressed
  const handleOnSlicePress = (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;

    const yIsInRange =
      y >= screenHeight / 2 - slideHeightActionOffset &&
      y <= screenHeight / 2 + slideHeightActionOffset;

    const tabWasOnRight = x >= screenWidth / 2 + slideWidthActionOffset;

    const tabWasOnLeft = x <= screenWidth / 2 - slideWidthActionOffset;

    const shoulChangeSlide = yIsInRange && (tabWasOnRight || tabWasOnLeft);

    if (shoulChangeSlide) {
      if (tabWasOnRight) {
        handleNextSlice();
        return;
      }

      if (tabWasOnLeft) {
        handlePreviousSlice();
        return;
      }
    }
  };

  const currentBgColor = getBgColorBasedOnSlide(currentSlide);

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorScreen msg='Something went wrong' />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ScreenHeader
              title='Report Slides'
              bgColor={currentBgColor}
              textColor='white'
            />
          ),
        }}
      />
      <TouchableOpacity
        activeOpacity={0.99}
        onPressIn={handleOnSlicePress}
        style={[
          styles.container,
          {
            backgroundColor: currentBgColor,
          },
        ]}
      >
        <SafeAreasSetting
          key={currentSlideIndice}
          statusBarBgColor={currentBgColor}
          bottomBgColor={currentBgColor}
          statusBarProps={{ style: 'light' }}
        />

        <ReportSlideIndicators
          currentSlide={currentSlide}
          slideItems={slideItems as any}
        />

        {currentSlide === 'expense' ? (
          <ExpenseSlideContent
            reportDateLabel={filter}
            category={data?.basicExpenses?.categoryWithMaxExpenseValue?.detail!}
            categoryAmountExpensed={
              data?.basicExpenses?.categoryWithMaxExpenseValue?.value!
            }
            isIncome={false}
            totalAmountExpensed={data?.basicExpenses?.totalExpense!}
          />
        ) : null}

        {currentSlide === 'income' ? (
          <ExpenseSlideContent
            reportDateLabel={filter}
            category={data?.basicExpenses?.categoryWithMaxIcomeValue?.detail!}
            categoryAmountExpensed={
              data?.basicExpenses?.categoryWithMaxIcomeValue?.value!
            }
            isIncome
            totalAmountExpensed={data?.basicExpenses?.totalIncome!}
          />
        ) : null}

        {currentSlide === 'budget' ? (
          <ExpenseSlideBudgetCard
            reportDateLabel={filter}
            allBudgets={data?.budgets || []}
            budgetsExceeds={data?.budgetsExceeds || []}
          />
        ) : null}

        {currentSlide === 'quote' ? (
          <ExpenseSlideQuote
            currentTab={filter}
            quoteData={randomQuote?.[0]!}
          />
        ) : null}
      </TouchableOpacity>
    </>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
}));


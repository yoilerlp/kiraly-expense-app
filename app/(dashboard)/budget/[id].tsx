import { Button, Icon, Typography } from '@/components';
import ScreenHeader from '@/components/header';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BudgetService } from '@/services';
import LoadingScreen from '@/components/LoadingScreen';
import { getCategoryConfig } from '@/utils';
import ProgressBar from '@/components/graph/ProgressBar';
import ErrorScreen from '@/components/ErrorScreen';
import BottomSheet from '@/components/bottomSheet';
import BottomSheetDecision from '@/components/bottomSheet/BottomSheetDecision';
import Toast from 'react-native-toast-message';
import CategoryIconCard from '@/components/ui/CategoryIconCard';

export default function BudgetDetailsView() {
  const { styles, theme } = useStyles(StylesSheet);

  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [bottomSheetIndex, setBottomSheetIndex] = React.useState(-1);

  const {
    data: budget,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['budget', id],
    queryFn: () => BudgetService.GetBudgeById(id),
    enabled: !!id,
  });

  const deleteBudgetMutation = useMutation({
    mutationFn: BudgetService.DeleteBudget,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Budget deleted successfully',
      });
      setBottomSheetIndex(-1);
      setTimeout(() => {
        router.replace(`/main/budget?month=${budget?.month}` as any);
      }, 1000);
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
        text2: 'Failed to delete budget',
      });
    },
  });

  const categoryColorConfig = getCategoryConfig(budget?.category!);

  const budgetCalcs = useMemo(() => {
    if (!budget) return undefined;

    const amountUsed = budget?.transactions?.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    const exceeded = amountUsed > budget?.amount;

    const remaining = exceeded ? 0 : budget?.amount - amountUsed;

    const pregress = (amountUsed / budget?.amount) * 100;

    return {
      amountUsed,
      exceeded,
      remaining,
      pregress,
    };
  }, [budget]);

  if (isLoading) return <LoadingScreen />;

  if (isError || !budget) return <ErrorScreen />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title={'Detail Budget'}
                returnUrl='/main/t_budget'
                rightIcon={
                  <Icon.WithOpacity
                    name='Trash'
                    onPress={() => {
                      setBottomSheetIndex(0);
                    }}
                  />
                }
              />
            );
          },
        }}
      />
      <View style={styles.container}>
        <CategoryIconCard
          containerColor={categoryColorConfig?.containerColor}
          iconName={categoryColorConfig?.name}
          categoryName={budget?.category?.name!}
        />
        <View>
          <Typography center type='Title2'>
            Remaining
          </Typography>
          <Typography center type='TitleX'>
            ${budgetCalcs?.remaining || 0}
          </Typography>
        </View>
        <View style={{ width: '100%' }}>
          <ProgressBar
            progress={budgetCalcs?.pregress || 0}
            fillColor={categoryColorConfig?.iconColor || theme.Colors.dark_100}
          />
        </View>
        {budgetCalcs?.exceeded ? (
          <View style={styles.alertExceededContainer}>
            <Icon name='Warning' size={32} color={theme.Colors.light_100} />
            <Typography color={theme.Colors.light_100} type='Body3'>
              You’ve exceed the limit
            </Typography>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <Link href={`/budget/edit/${id}` as any} asChild>
            <Button text='Edit' size='full' />
          </Link>
        </View>
        {/* Bottom sheet for delete */}

        <BottomSheet
          index={bottomSheetIndex}
          onChange={setBottomSheetIndex}
          snapPoints={['25%']}
        >
          <BottomSheetDecision
            onConfirm={() => {
              deleteBudgetMutation.mutate(id);
            }}
            onCancel={() => {
              setBottomSheetIndex(-1);
            }}
            isLoading={deleteBudgetMutation.isPending}
            title='Remove this Budget'
            subtitle='Are you sure do you wanna remove this budget?'
          />
        </BottomSheet>
      </View>
    </>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 32,
    backgroundColor: theme.Colors.light_100,
    alignItems: 'center',
    gap: 32,
  },
  categorySection: {
    borderWidth: 1,
    borderColor: theme.Colors.light_40,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Colors.yellow_20,
    padding: 4,
    borderRadius: 8,
  },
  alertExceededContainer: {
    backgroundColor: theme.Colors.red_100,
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
}));


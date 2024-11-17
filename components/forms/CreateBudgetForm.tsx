import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Stack, useNavigation, useRouter } from 'expo-router';

import ScreenHeader from '@/components/header';
import { Colors } from '@/theme/Colors';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SectionRounded from '@/components/screens/SectionRounded';

import {
  Button,
  Input,
  LoadingSpinner,
  Select,
  Slider,
  Switch,
  Typography,
} from '@/components';
import { Controller, useForm } from 'react-hook-form';
import useCategories from '@/hooks/data/useCategories';
import { BudgetService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export type ICreateBudgetForm = {
  amount: number;
  categoryId: string;
  receiveAlert?: boolean;
  alertPercentage: number | null;
};

type Props = {
  month: number;
  initialValues?: Partial<ICreateBudgetForm> & {
    id: string;
  };
  isEdit?: boolean;
};

export default function CreateBadgetForm({
  month,
  initialValues,
  isEdit,
}: Props) {
  const router = useRouter();

  const { styles, theme } = useStyles(CreateBudgetStyles);

  const { control, setValue, handleSubmit, watch, reset } =
    useForm<ICreateBudgetForm>();

  const values = watch();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: Colors.violet_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: Colors.light_100,
    },
    statusBarProps: {
      style: 'light',
    },
  });

  const { data: categories, isPending: isCategoriesPending } = useCategories();

  const createBudgetMutation = useMutation({
    mutationFn: BudgetService.CreateBudget,
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Budget created',
        text2: 'Budget created successfully',
      });

      router.replace(`/main/budget?month=${month}` as any);
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Budget creation failed',
        text2: error,
      });
    },
  });

  const editBudgetMutation = useMutation({
    mutationFn: BudgetService.UpdateBudget,
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Budget updated',
        text2: 'Budget updated successfully',
      });

      router.replace(`/main/budget?month=${month}` as any);
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Budget update failed',
        text2: error,
      });
    },
  });

  const isLoading =
    createBudgetMutation.isPending || editBudgetMutation.isPending;

  const handleCreateBudget = () => {
    const { alertPercentage, categoryId, amount, receiveAlert } = values;

    const categoryName =
      categories?.find((category) => category.id === categoryId)?.name || '';

    const amountAlert =
      receiveAlert && alertPercentage ? amount * (alertPercentage / 100) : null;

    const valuesToMutate = {
      amount,
      categoryId,
      receiveAlert: Boolean(receiveAlert),
      year: new Date().getFullYear(),
      month,
      description: `Budget of ${amount} for ${categoryName}`,
      amountAlert,
    };

    if (isEdit) {
      if (!initialValues?.id) return;

      editBudgetMutation.mutate({
        id: initialValues?.id || '',
        data: valuesToMutate,
      });

      return;
    }

    createBudgetMutation.mutate(valuesToMutate);
  };

  if (isCategoriesPending) return <LoadingSpinner />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title={`${isEdit ? 'Edit' : 'Create'} Budget`}
                bgColor={Colors.violet_100}
                textColor={Colors.light_100}
              />
            );
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.amontContainer}>
          <Typography
            color={theme.Colors.light_80}
            type='Title3'
            style={{ opacity: 0.64 }}
          >
            How much?
          </Typography>
          <Controller
            control={control}
            name='amount'
            rules={{
              required: 'This field is required',
              validate(value) {
                const realValue = Number(value);
                if (isNaN(realValue)) return 'Invalid number';
                if (realValue <= 0) return 'Invalid number';
                return true;
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value ? String(field.value) : undefined}
                  error={fieldState.error?.message}
                  keyboardType='numeric'
                  placeholderTextColor={theme.Colors.light_100}
                  errorStyles={{ color: theme.Colors.light_80 }}
                  containerStyles={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    padding: 0,
                    height: 78,
                  }}
                  placeholder='$0'
                  style={{
                    fontSize: Platform.select({ ios: 78, default: 50 }),
                    color: theme.Colors.light_100,
                  }}
                />
              );
            }}
          />
        </View>
        <SectionRounded size={6}>
          <View style={styles.inputs}>
            <Controller
              control={control}
              name='categoryId'
              rules={{ required: 'Select a value' }}
              render={({ field, fieldState }) => {
                return (
                  <Select
                    placeholder='Category'
                    items={
                      categories?.map((category) => ({
                        label: category.name,
                        value: category.id,
                      })) || []
                    }
                    onChange={field.onChange}
                    value={field.value}
                    error={fieldState?.error?.message}
                  />
                );
              }}
            />
            <View style={styles.alertSection}>
              <View style={{ width: '60%' }}>
                <Typography style={{ marginBottom: 4 }} type='Body1'>
                  Receive Alert
                </Typography>
                <Typography color={theme.Colors.light_20} type='Body3'>
                  Receive alert when it reaches some point.
                </Typography>
              </View>
              <Controller
                control={control}
                name='receiveAlert'
                render={({ field, fieldState }) => {
                  return (
                    <Switch
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  );
                }}
              />
            </View>
            {values?.receiveAlert ? (
              <Controller
                name='alertPercentage'
                rules={{
                  validate: (val) => {
                    if (!values?.receiveAlert) return true;

                    if (!val) return 'This field is required';
                  },
                }}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Slider
                      value={field.value || undefined}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      errorMsg={fieldState?.error?.message}
                    />
                  );
                }}
              />
            ) : null}
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button
              text={isEdit ? 'Update' : 'Create'}
              size='full'
              onPress={handleSubmit(handleCreateBudget)}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </View>
        </SectionRounded>
      </View>
    </>
  );
}

const CreateBudgetStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
  },
  amontContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    gap: 13,
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  inputs: {
    gap: 16,
  },
  alertSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
}));


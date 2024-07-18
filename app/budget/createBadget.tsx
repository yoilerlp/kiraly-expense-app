import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';

import ScreenHeader from '@/components/header';
import { Colors } from '@/theme/Colors';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SectionRounded from '@/components/screens/SectionRounded';
import {
  Input,
  LoadingSpinner,
  Select,
  Slider,
  Switch,
  Typography,
} from '@/components';
import { Controller, useForm } from 'react-hook-form';
import { Budget } from '@/interfaces';
import useCategories from '@/hooks/data/useCategories';

type ICreateBudgetForm = {
  description: string;
  amount: number;
  categoryId: string;
  month: number;
  year: number;
  receiveAlert?: boolean;
  amountAlert: number | null;
};

export default function CreateBadgetView() {
  const { styles, theme } = useStyles(CreateBudgetStyles);

  const { control, setValue, handleSubmit, watch, reset } =
    useForm<ICreateBudgetForm>();

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

  if (isCategoriesPending) return <LoadingSpinner />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title={'Create Budget'}
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
                    fontSize: 78,
                    color: theme.Colors.light_100,
                  }}
                />
              );
            }}
          />
        </View>
        <SectionRounded size={4}>
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
            <Slider />
          </View>
          {/* <Typography type='Body3'>
            {JSON.stringify(watch(), null, 2)}
          </Typography> */}
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
    flex: 7,
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


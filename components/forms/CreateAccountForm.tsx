import { createStyleSheet, useStyles } from 'react-native-unistyles';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { Button, Input, Select, Typography } from '@/components';
import { Controller, useForm } from 'react-hook-form';
import { AccountTypeOptions } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AccountService } from '@/services';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { GET_ALL_ACCOUNTS_BY_USER_KEY } from '@/hooks/data/useUserAccounts';
import SectionRounded from '../screens/SectionRounded';

type FormValues = {
  name: string;
  type: string;
};

type CreateAccountFormProps = {
  isUpdating?: boolean;
  initialValues?: Partial<FormValues> & {
    id: string;
  };
};

export default function CreateAccountForm({
  isUpdating,
  initialValues,
}: CreateAccountFormProps) {
  const router = useRouter();

  const { styles, theme } = useStyles(addAccountStyles);

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: theme.Colors.violet_100,
    },
    viewBottomContainerStyles: {
      backgroundColor: 'white',
    },
  });

  const { control, handleSubmit, formState, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        name: '',
        type: '',
      },
    });

  const { errors } = formState;

  useEffect(() => {
    if (initialValues && initialValues?.id) {
      reset({
        name: initialValues.name || '',
        type: initialValues.type || '',
      });
    }
  }, [initialValues]);

  const queryClient = useQueryClient();

  const createAccountMutation = useMutation({
    mutationFn: AccountService.CreateUserAccounts,
    onSuccess: async (data) => {
      Toast.show({
        type: 'success',
        text1: 'Account created successfully',
      });

      await queryClient.setQueryData(
        [GET_ALL_ACCOUNTS_BY_USER_KEY],
        (old: any) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );

      router.replace('/main/home');
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  // update account
  const updateAccountMutation = useMutation({
    mutationFn: AccountService.UpdateUserAccount,
    onSuccess: async (data) => {
      Toast.show({
        type: 'success',
        text1: 'Account updated successfully',
      });

      await queryClient.setQueryData(
        [GET_ALL_ACCOUNTS_BY_USER_KEY],
        (old: any) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );

      router.replace('/main/home');
    },
    onError: (error: string) => {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const onSubmit = (data: { name: string; type: string }) => {
    if (isUpdating) {
      updateAccountMutation.mutate({
        id: initialValues?.id!,
        data: {
          name: data.name.trim(),
          type: data.type as any,
        },
      });

      return;
    }

    createAccountMutation.mutate({
      name: data.name.trim(),
      type: data.type as any,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' networkActivityIndicatorVisible={false} />
      <View style={styles.content} />
      <SectionRounded size={5} style={styles.sheetContainer}>
        <View style={[styles.sheetContainer, styles.sheetContent]}>
          <Typography center type='Title2'>
            {isUpdating ? 'Update' : 'Add new'} Account
          </Typography>
          <Controller
            rules={{ required: 'Name is required' }}
            name='name'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Name'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                maxLength={40}
                editable={!createAccountMutation.isPending}
              />
            )}
          />
          <Controller
            rules={{ required: 'Account type is required' }}
            name='type'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={AccountTypeOptions}
                placeholder='Account Type'
                onChange={onChange}
                value={value}
                disabled={createAccountMutation.isPending}
                error={errors.type?.message}
              />
            )}
          />

          <Button
            isLoading={createAccountMutation.isPending}
            disabled={createAccountMutation.isPending}
            onPress={handleSubmit(onSubmit)}
            style={{ marginTop: 16 }}
            size='full'
            text={`${isUpdating ? 'Update' : ' Add'} Account`}
          />
        </View>
      </SectionRounded>
    </View>
  );
}

const addAccountStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    flex: 1,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
  },
  sheetContent: {
    padding: 16,
    paddingTop: 24,
    gap: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
}));

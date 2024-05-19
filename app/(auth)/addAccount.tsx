import { createStyleSheet, useStyles } from 'react-native-unistyles';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
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
import useAuth from '@/hooks/useAuth';

export default function AddAccount() {
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

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: '',
      type: '',
    },
  });

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
      console.log({ error });
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const { errors } = formState;

  const onSubmit = (data: { name: string; type: string }) => {
    createAccountMutation.mutate({
      name: data.name.trim(),
      type: data.type,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' networkActivityIndicatorVisible={false} />
      <View style={styles.content}></View>
      <BottomSheet
        ref={bottomSheetRef}
        animateOnMount={false}
        enableOverDrag={false}
        enableContentPanningGesture={false}
        snapPoints={snapPoints}
        handleComponent={() => null}
        backgroundStyle={styles.sheetContainer}
      >
        <BottomSheetView style={[styles.sheetContainer, styles.sheetContent]}>
          <Typography center type='Title2'>
            Add new Account
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
            text='Add Account'
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const addAccountStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.violet_100,
  },
  content: {
    flex: 0.5,
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


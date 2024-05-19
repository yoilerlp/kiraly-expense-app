import { View, Dimensions } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SectionRounded from './SectionRounded';
import Input from '../input';
import Typography from '../typography';
import { Transaction } from '@/interfaces/transaction';
import { Controller, useForm } from 'react-hook-form';
import Select from '../select';
import InputFile from '../inputFile';
import { LoadedFile } from '@/interfaces/file';
import Button from '../button';
import useUserAccounts from '@/hooks/data/useUserAccounts';
import LoadingSpinner from '../loaders';
import { useMutation } from '@tanstack/react-query';
import { transferService } from '@/services';
import Toast from 'react-native-toast-message';
import { convertLoadedFilesToFiles } from '@/utils/files';
import Icon from '../icon';
import { useRouter } from 'expo-router';

type ICreateTransfer = {
  files: LoadedFile[];
  description: string;
  amount: number;
  originAccountId: string;
  destinationAccountId: string;
};

export default function CreateTransferScreen() {
  const router = useRouter();

  const { data: accounts, isPending: isAccountsPending } = useUserAccounts();

  const { control, setValue, handleSubmit, watch } = useForm<ICreateTransfer>();

  const { styles, theme } = useStyles(stylesSheet);

  // mutations
  const createTransferMutation = useMutation({
    mutationFn: transferService.CreateTransfer,
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: 'Transfer created',
        text2: 'Transfer created successfully',
      });

      router.replace('/main/home');
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Transfer failed',
        text2: error,
      });
    },
  });

  const values = watch();

  const isLoading = isAccountsPending;

  const handleCreateTransfer = async () => {
    const filesMapped = await convertLoadedFilesToFiles(values?.files || []);

    createTransferMutation.mutate({
      ...values,
      files: filesMapped as any,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
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
      <SectionRounded>
        <View style={styles.fieldsContainer}>
          <View style={styles.accountsSections}>
            <Controller
              control={control}
              name='originAccountId'
              rules={{
                required: 'Select a account',
              }}
              render={({ field, fieldState }) => {
                return (
                  <View style={styles.accountSelect}>
                    <Select
                      style={{}}
                      items={
                        accounts?.map((account) => ({
                          label: account.name,
                          value: account.id,
                        })) || []
                      }
                      placeholder='From'
                      onChange={(value) => {
                        field.onChange(value);

                        if (values?.destinationAccountId === value) {
                          setValue('destinationAccountId', '');
                        }
                      }}
                      value={field.value}
                      error={fieldState?.error?.message}
                    />
                  </View>
                );
              }}
            />
            <View style={styles.floatinsIcon}>
              <Icon name='Transaction' color={theme.Colors.blue_100} />
            </View>
            <Controller
              control={control}
              name='destinationAccountId'
              rules={{
                required: 'Select a account',
                validate: (value) => {
                  if (!value) return 'Select a account';
                  if (value === values?.originAccountId)
                    return 'Select a different account';
                  return true;
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <View style={styles.accountSelect}>
                    <Select
                      items={
                        accounts
                          ?.map((account) => ({
                            label: account.name,
                            value: account.id,
                          }))
                          .filter(
                            (account) =>
                              account.value !== values?.originAccountId
                          ) || []
                      }
                      placeholder='To'
                      onChange={field.onChange}
                      value={field.value}
                      error={fieldState?.error?.message}
                    />
                  </View>
                );
              }}
            />
          </View>

          <Controller
            control={control}
            name='description'
            rules={{ required: 'Please add a description' }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder='Description'
                  onChangeText={field.onChange}
                  value={field.value}
                  error={fieldState?.error?.message}
                  maxLength={300}
                />
              );
            }}
          />

          <Controller
            control={control}
            name='files'
            render={({ field, fieldState }) => {
              return (
                <InputFile
                  files={field.value?.length > 0 ? field.value : undefined}
                  onChange={(file) => {
                    setValue('files', [...(field.value || []), file]);
                  }}
                  onDeleteFile={(_, idxToDelete) => {
                    setValue(
                      'files',
                      field?.value?.filter(
                        (_: any, idx: number) => idx !== idxToDelete
                      ) || []
                    );
                  }}
                />
              );
            }}
          />
        </View>
        <View style={{ paddingBottom: 24 }}>
          <Button
            disabled={createTransferMutation.isPending}
            isLoading={createTransferMutation.isPending}
            onPress={handleSubmit(handleCreateTransfer)}
            text='Create Transfer'
            size='full'
          />
        </View>
      </SectionRounded>
    </View>
  );
}

const { width } = Dimensions.get('window');

const stylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.blue_100,
  },
  amontContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 13,
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  fieldsContainer: {
    flex: 1,
    gap: 16,
  },
  accountsSections: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  accountSelect: {
    width: (width - 32 - 25) / 2,
  },
  floatinsIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    backgroundColor: theme.Colors.light_80,
    position: 'absolute',
    right: (width - 32 - 40) / 2,
    top: (56 - 40) / 2,
    zIndex: 10,
  },
}));


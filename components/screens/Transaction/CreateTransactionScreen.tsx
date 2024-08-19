import { Platform, View } from 'react-native';
import React, { useMemo, useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SectionRounded from '../SectionRounded';
import Input from '../../input';
import Typography from '../../typography';
import { Transaction, TransactionType } from '@/interfaces/transaction';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../select';
import InputFile from '../../inputFile';
import { LoadedFile } from '@/interfaces/file';
import Button from '../../button';
import useCategories from '@/hooks/data/useCategories';
import useUserAccounts from '@/hooks/data/useUserAccounts';
import LoadingSpinner from '../../loaders';
import { useMutation } from '@tanstack/react-query';
import { TransactionService } from '@/services';
import Toast from 'react-native-toast-message';
import { convertLoadedFilesToFiles } from '@/utils/files';
import { Stack, useRouter } from 'expo-router';
import ScreenHeader from '@/components/header';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';

type Props = {
  type: Transaction['type'];
  initialTransaction?: Transaction;
  isEdit?: boolean;
};

type ICreateTransactionData = Pick<
  Transaction,
  'amount' | 'categoryId' | 'accountId' | 'description'
> & {
  files: LoadedFile[];
  filesToDelete?: string[];
};

const generateInitialValues = (
  initialTransaction: Transaction
): ICreateTransactionData => {
  return {
    amount: initialTransaction.amount,
    categoryId: initialTransaction.categoryId,
    accountId: initialTransaction.accountId,
    description: initialTransaction.description,
    files: initialTransaction.transactionFiles.map(
      ({ file, id: transactionFileId }) => {
        return {
          id: transactionFileId,
          uri: file.url,
          type: file.type,
          size: file.size,
          mimeType: file.type,
          fileName: file.name,
        };
      }
    ),
  };
};

export default function CreateTransactionScreen({
  type,
  initialTransaction,
  isEdit,
}: Props) {
  const isExpense = type === TransactionType.EXPENSE;

  const router = useRouter();

  const { data: categories, isPending: isCategoriesPending } = useCategories();

  const { data: accounts, isLoading: isAccountsPending } = useUserAccounts();

  const { control, setValue, handleSubmit, watch, reset } =
    useForm<ICreateTransactionData>();

  const { styles, theme } = useStyles(stylesSheet);

  const pageStyles = useMemo(() => {
    return {
      statusBarContainerStyles: {
        backgroundColor: isExpense
          ? theme.Colors.red_100
          : theme.Colors.green_100,
      },
      viewBottomContainerStyles: {
        backgroundColor: theme.Colors.light_100,
      },
      statusBarProps: {
        style: 'light',
      },
    };
  }, [type]);

  useSetPageContainerStyles(pageStyles as any);

  // mutations
  const createTransactionMutation = useMutation({
    mutationFn: TransactionService.CreateTransaction,
    onSuccess(data, variables, context) {
      Toast.show({
        type: 'success',
        text1: 'Transaction created',
        text2: 'Transaction created successfully',
      });

      router.replace('/main/home');
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Transaction failed',
        text2: error,
      });
    },
  });

  const updateTransactionMutation = useMutation({
    mutationFn: TransactionService.UpdateTransaction,
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: 'Transaction updated',
        text2: `Transaction ${data?.key} updated successfully`,
      });

      router.replace(`/transactions/view/transaction/${data?.id}` as any);
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: 'Transaction failed',
        text2: error,
      });
    },
  });

  useEffect(() => {
    if (initialTransaction) {
      reset(generateInitialValues(initialTransaction));
    }
  }, [initialTransaction]);

  const values = watch();

  const isLoading = isCategoriesPending || isAccountsPending;

  const handleUpdateTransaction = async () => {
    if (!initialTransaction?.id) return;

    const { files, filesToDelete, ...restValues } = values;

    const filesToUpload = files.filter((file) => !file.id) || [];

    const filesMapped = await convertLoadedFilesToFiles(filesToUpload);

    updateTransactionMutation.mutate({
      id: initialTransaction?.id,
      data: {
        ...restValues,
        type,
        files: filesMapped as any,
        filesToDelete: filesToDelete || [],
      },
    });
  };

  const handleCreateTransaction = async () => {
    const { files, filesToDelete, ...restValues } = values;
    const filesMapped = await convertLoadedFilesToFiles(values?.files || []);

    createTransactionMutation.mutate({
      ...restValues,
      type,
      files: filesMapped as any,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title={isExpense ? 'Expense' : 'Income'}
                bgColor={
                  isExpense ? theme.Colors.red_100 : theme.Colors.green_100
                }
                textColor={theme.Colors.light_100}
              />
            );
          },
        }}
      />

      <View style={styles.container({ type })}>
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
        <SectionRounded>
          <View style={styles.fieldsContainer}>
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
              name='accountId'
              rules={{ required: 'Select a value' }}
              render={({ field, fieldState }) => {
                return (
                  <Select
                    items={
                      accounts?.map((account) => ({
                        label: account.name,
                        value: account.id,
                      })) || []
                    }
                    placeholder='Wallet'
                    onChange={field.onChange}
                    value={field.value}
                    error={fieldState?.error?.message}
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
                    onDeleteFile={(fileToDele, idxToDelete) => {
                      if (fileToDele?.id) {
                        setValue(
                          'filesToDelete',
                          [values?.filesToDelete || [], fileToDele?.id].flat()
                        );
                      }

                      setValue(
                        'files',
                        field?.value?.filter((_, idx) => idx !== idxToDelete) ||
                          []
                      );
                    }}
                  />
                );
              }}
            />
            {/* <Typography type='Body3'>
              {JSON.stringify(values.filesToDelete, null, 2)}
            </Typography> */}
          </View>
          <View style={{ paddingBottom: 24 }}>
            <Button
              disabled={
                createTransactionMutation.isPending ||
                updateTransactionMutation.isPending
              }
              isLoading={
                createTransactionMutation.isPending ||
                updateTransactionMutation.isPending
              }
              onPress={handleSubmit(
                isEdit ? handleUpdateTransaction : handleCreateTransaction
              )}
              text={isEdit ? 'Update Transaction' : 'Create Transaction'}
              size='full'
            />
          </View>
        </SectionRounded>
      </View>
    </>
  );
}

const stylesSheet = createStyleSheet((theme) => ({
  container: ({ type }: { type: Props['type'] }) => {
    return {
      flex: 1,
      backgroundColor:
        type === TransactionType.EXPENSE
          ? theme.Colors.red_100
          : theme.Colors.green_100,
    };
  },
  amontContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    gap: 13,
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  fieldsContainer: {
    flex: 1,
    gap: 16,
  },
}));

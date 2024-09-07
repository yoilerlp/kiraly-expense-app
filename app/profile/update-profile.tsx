import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { Button, Icon, Input } from '@/components';
import { UserAvatar } from '@/components/ui';
import ImageUploader from '@/components/inputFile/Uploaders/ImageUploader';
import { LoadedFile } from '@/interfaces';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import { UserService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { convertLoadedFilesToFiles } from '@/utils';
import useAuth from '../../hooks/useAuth';
import { CURRENT_USER_QUERY_KEY } from '@/hooks/useUserLogged';

type IUpdateProfileForm = {
  name: string;
  lastName: string;
  photo: LoadedFile | undefined;
};

export default function updateProfileView() {
  const auth = useAuth();

  const queryClient = useQueryClient();

  const { styles, theme } = useStyles(StylesSheet);

  const { control, formState, handleSubmit, setValue, watch, reset } =
    useForm<IUpdateProfileForm>({
      defaultValues: {
        name: '',
        lastName: '',
        photo: undefined,
      },
    });

  useEffect(() => {
    if (!auth.user) return;

    reset({
      name: auth?.user?.name,
      lastName: auth?.user?.lastName,
      photo: auth?.user?.photo
        ? {
            fileName: 'profile photo',
            type: '',
            mimeType: '',
            size: 0,
            uri: auth.user.photo,
            id: auth.user.id,
          }
        : undefined,
    });
  }, [auth.user]);

  const updateUserMutation = useMutation({
    mutationFn: UserService.UpdateUser,
    onSuccess(data, variables, context) {
      Toast.show({
        type: 'success',
        text1: 'User updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      auth?.reloadUser?.();
    },
    onError(error: string) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    },
  });

  const values = watch();

  const { errors } = formState;

  const onSubmit = async (data: IUpdateProfileForm) => {
    const photoFile = !data?.photo?.id
      ? (await convertLoadedFilesToFiles([data?.photo!]))[0]
      : null;
    updateUserMutation.mutate({
      name: data?.name,
      lastName: data?.lastName,
      file: (photoFile as any) ?? undefined,
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader title='Edit Profile' />,
        }}
      />
      <View style={styles.formContainer}>
        <View style={styles.avatarContainer}>
          <UserAvatar
            imgUrl={values?.photo?.uri}
            containerStyles={styles.avatarStyles}
          />
          <ImageUploader
            onResult={(data) => {
              setValue('photo', data);
            }}
            renderComponent={(onPress) => {
              return (
                <Icon.WithOpacity
                  touchableOpacityProps={{
                    style: styles.editIconCntainer,
                    activeOpacity: 0.8,
                    onPress,
                  }}
                  name='Edit'
                  color={theme.Colors.violet_100}
                  size={32}
                />
              );
            }}
          />
        </View>
        <Controller
          control={control}
          name='name'
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='lastName'
          rules={{ required: 'Last Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Last Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.lastName?.message}
            />
          )}
        />
        <Button
          isLoading={updateUserMutation.isPending}
          disabled={updateUserMutation.isPending}
          style={{ marginTop: 40 }}
          onPress={handleSubmit(onSubmit)}
          size='full'
          text='Update'
        />
      </View>
    </View>
  );
}

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  formContainer: {
    gap: 24,
  },
  editIconCntainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    zIndex: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    padding: 8,
  },
  avatarStyles: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 16,
  },
}));

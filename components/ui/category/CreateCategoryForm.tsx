import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Category, CategoryKey } from '@/interfaces';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Typography from '@/components/typography';
import Icon from '@/components/icon';
import ModalSelectCategoryKey from './ModalSelectCategoryKey';

type ICreateCategoryFormData = Pick<
  Category,
  'name' | 'description' | 'key' | 'isActive'
>;

const CreateCategoryForm = () => {
  const { styles, theme } = useStyles(StylesSheet);

  const { control, setValue, handleSubmit, watch, reset } =
    useForm<ICreateCategoryFormData>({
      defaultValues: {
        key: CategoryKey.DOMI,
      },
    });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputsContainer}>
        <Controller
          control={control}
          name='name'
          rules={{ required: 'Please add a name' }}
          render={({ field, fieldState }) => {
            return (
              <Input
                containerStyles={styles.inputContainer}
                placeholder='Name'
                onChangeText={field.onChange}
                value={field.value}
                error={fieldState?.error?.message}
                maxLength={100}
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
          name='key'
          rules={{ required: 'Please select a key' }}
          render={({ field, fieldState }) => {
            return (
              <View>
                <Typography
                  style={{ marginBottom: 4 }}
                  type='Body2'
                  color={theme.Colors.violet_100}
                >
                  Icon key
                </Typography>
                <TouchableOpacity
                  style={styles.keySelector}
                  activeOpacity={0.8}
                >
                  {field.value ? (
                    <View style={styles.keySelectorContent}>
                      <Typography color={theme.Colors.violet_100} type='Body2'>
                        {' '}
                        Key: {field.value}
                      </Typography>
                      <Icon
                        name='Camera'
                        size={32}
                        color={theme.Colors.violet_100}
                      />
                    </View>
                  ) : (
                    <Typography color={theme.Colors.violet_100} type='Body2'>
                      Select a category key
                    </Typography>
                  )}
                </TouchableOpacity>
                {fieldState?.error?.message ? (
                  <Typography type='Body2' color={theme.Colors.red_100}>
                    {fieldState?.error?.message}
                  </Typography>
                ) : null}
              </View>
            );
          }}
        />


        <ModalSelectCategoryKey />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateCategoryForm;

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  inputsContainer: {
    gap: 16,
  },
  inputContainer: {},
  keySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: theme.Colors.light_80,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.Colors.violet_20,
    justifyContent: 'center',
    height: 40,
  },
  keySelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
}));


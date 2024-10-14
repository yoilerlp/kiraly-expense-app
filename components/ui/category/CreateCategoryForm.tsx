import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Category } from '@/interfaces';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Typography from '@/components/typography';
import Icon from '@/components/icon';
import ModalSelectCategoryColor from './ModalSelectCategoryKey';
import ColorCircle from '../ColorCircle';
import ModalSelectIcon from './ModalSelectCategoryIcon';
import { Colors } from '@/theme/Colors';
import { Stack } from 'expo-router';
import ScreenHeader from '@/components/header';
import CategoryIconCard from '../CategoryIconCard';
import Button from '@/components/button';
import SafeAreasSetting from '@/components/SafeAreasSetting';
import Switch from '@/components/switch';
import useMutateCategory from '@/hooks/data/useMutateCategory';

type ICreateCategoryFormData = Pick<
  Category,
  'name' | 'description' | 'key' | 'isActive'
> & { mainColor: string; subColor: string; icon: string };

type Props = {
  isUpdating?: boolean;
  initialValues?: Partial<ICreateCategoryFormData>;
  id?: string;
};

const CreateCategoryForm = ({ initialValues, id, isUpdating }: Props) => {
  const [showModalSelectMainColor, setShowModalSelectMainColor] =
    useState(false);

  const [showModalSelectSubColor, setShowModalSelectSubColor] = useState(false);

  const [showModalSelectIcon, setShowModalSelectIcon] = useState(false);

  const { styles, theme } = useStyles(StylesSheet);

  const { control, setValue, handleSubmit, watch, reset } =
    useForm<ICreateCategoryFormData>();

  const {
    createCategoryMutation,
    isLoding: mutationCategoryIsLoading,
    updateCategoryMutation,
  } = useMutateCategory();

  useEffect(() => {
    if (initialValues && isUpdating) {
      reset(initialValues);
    }
  }, [initialValues]);

  const values = watch();

  const submit = (values: ICreateCategoryFormData) => {
    if (isUpdating && id) {
      updateCategoryMutation({
        id,
        data: values,
      });
      return;
    }

    createCategoryMutation({
      ...values,
      key: `${values.name}-${values.icon}` as any,
    });
  };

  return (
    <>
      <SafeAreasSetting
        statusBarBgColor={theme.Colors.violet_100}
        bottomBgColor={theme.Colors.violet_100}
        statusBarProps={{ style: 'light' }}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ScreenHeader
              title={isUpdating ? 'Update Category' : 'Create Category'}
              bgColor={theme.Colors.violet_100}
              textColor={theme.Colors.light_100}
            />
          ),
        }}
      />
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
                <View>
                  <Typography
                    type='Body2'
                    color={Colors.violet_100}
                    style={{ marginBottom: 4 }}
                  >
                    Name
                  </Typography>
                  <Input
                    containerStyles={styles.inputContainer}
                    placeholder='Name'
                    onChangeText={field.onChange}
                    value={field.value}
                    error={fieldState?.error?.message}
                    maxLength={20}
                  />
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name='description'
            rules={{ required: 'Please add a description' }}
            render={({ field, fieldState }) => {
              return (
                <View>
                  <Typography
                    type='Body2'
                    color={Colors.violet_100}
                    style={{ marginBottom: 4 }}
                  >
                    Description
                  </Typography>

                  <Input
                    placeholder='Description'
                    onChangeText={field.onChange}
                    value={field.value}
                    error={fieldState?.error?.message}
                    maxLength={300}
                  />
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name='mainColor'
            rules={{ required: 'Please select a color' }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <SelectFieldSection
                    label='Main Color (icon color)'
                    placeholder='Select a Color'
                    errorMsg={fieldState?.error?.message}
                    value={field.value}
                    type='Color'
                    onClickField={() => setShowModalSelectMainColor(true)}
                    styles={styles}
                  />
                </>
              );
            }}
          />
          <Controller
            control={control}
            name='subColor'
            rules={{ required: 'Please select a color' }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <SelectFieldSection
                    label='Sub Color (background color)'
                    placeholder='Select a Color'
                    errorMsg={fieldState?.error?.message}
                    value={field.value}
                    onClickField={() => setShowModalSelectSubColor(true)}
                    styles={styles}
                  />
                </>
              );
            }}
          />
          <Controller
            control={control}
            name='icon'
            rules={{ required: 'Please select a icon' }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <SelectFieldSection
                    label='Icon'
                    placeholder='Select a Icon'
                    errorMsg={fieldState?.error?.message}
                    value={field.value}
                    onClickField={() => setShowModalSelectIcon(true)}
                    styles={styles}
                    type='Icon'
                  />
                </>
              );
            }}
          />

          {values?.icon &&
          values?.mainColor &&
          values?.subColor &&
          values?.name ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CategoryIconCard
                containerColor={values.subColor}
                iconName={values.icon as any}
                categoryName={values?.name}
                iconColor={values?.mainColor}
                wrapperStyles={{
                  maxWidth: 180,
                }}
              />
            </View>
          ) : null}

          {isUpdating ? (
            <View style={styles.switchContainer}>
              <Typography type='Title3'>Is Active ?</Typography>
              <Switch
                value={values.isActive}
                onValueChange={(value) => setValue('isActive', value)}
              />
            </View>
          ) : null}

          <View style={styles.btnSection}>
            <Button
              text={isUpdating ? 'Update' : 'Create'}
              size='full'
              onPress={handleSubmit(submit)}
              isLoading={mutationCategoryIsLoading}
              disabled={mutationCategoryIsLoading}
            />
          </View>

          {showModalSelectMainColor ? (
            <ModalSelectCategoryColor
              open={showModalSelectMainColor}
              selectColor={values.mainColor}
              onClose={() => {
                setShowModalSelectMainColor(false);
              }}
              onSelectColor={(color) => {
                setValue('mainColor', color);
                setShowModalSelectMainColor(false);
              }}
            />
          ) : null}

          {showModalSelectSubColor ? (
            <ModalSelectCategoryColor
              open={showModalSelectSubColor}
              selectColor={values.subColor}
              onClose={() => {
                setShowModalSelectSubColor(false);
              }}
              onSelectColor={(color) => {
                setValue('subColor', color);
                setShowModalSelectSubColor(false);
              }}
            />
          ) : null}

          {showModalSelectIcon ? (
            <ModalSelectIcon
              open={showModalSelectIcon}
              onClose={() => {
                setShowModalSelectIcon(false);
              }}
              selectIcon={values.icon}
              onSelectIcon={(icon) => {
                setValue('icon', icon);
                setShowModalSelectIcon(false);
              }}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateCategoryForm;

const SelectFieldSection = ({
  styles,
  label,
  placeholder,
  errorMsg,
  value,
  type = 'Color',
  onClickField,
}: {
  label: string;
  placeholder: string;
  value: any;
  errorMsg?: string;
  type?: 'Color' | 'Icon';
  onClickField: () => void;
  styles: {
    keySelector: ViewStyle;
    keySelectorContent: ViewStyle;
  };
}) => {
  return (
    <View>
      <Typography
        style={{ marginBottom: 4 }}
        type='Body2'
        color={Colors.violet_100}
      >
        {label}
      </Typography>
      <TouchableOpacity
        style={styles.keySelector}
        activeOpacity={0.8}
        onPress={onClickField}
      >
        {value ? (
          <View style={styles.keySelectorContent}>
            <Typography type='Body2'>{value}</Typography>
            {type === 'Icon' ? (
              <Icon name={value} color={Colors.violet_100} size={25} />
            ) : (
              <ColorCircle color={value} />
            )}
          </View>
        ) : (
          <Typography color={Colors.violet_100} type='Body2'>
            {placeholder}
          </Typography>
        )}
      </TouchableOpacity>
      {errorMsg ? (
        <Typography type='Body2' color={Colors.red_100}>
          {errorMsg}
        </Typography>
      ) : null}
    </View>
  );
};

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  inputsContainer: {
    gap: 16,
    flex: 1,
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
    gap: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 'auto',
  },
  btnSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
}));


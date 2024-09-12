import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Typography from '@/components/typography';
import { Colors } from '@/theme/Colors';
import FileItem from '@/components/inputFile/FileItem';
import Button from '@/components/button';
import { Link, Stack } from 'expo-router';
import { LoadedFile, TransactionType } from '@/interfaces';
import ScreenHeader from '@/components/header';
import Icon from '@/components/icon';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';
import { numberToTwoDecimals } from '@/utils/number';
import { capitalizeFirstLetter } from '@/utils/text';
import { formatDate } from '@/utils/date';
import BottomSheet from '@/components/bottomSheet';
import BottomSheetDecision from '@/components/bottomSheet/BottomSheetDecision';
import { formatCurrency } from '@/utils/currency';

type Props = {
  type: TransactionType;
  data: {
    amount: number;
    description: string;
    files: LoadedFile[];
    createdAt: string;
    categoryOrFrom: string;
    walletOrTo: string;
    key: string;
    id: string;
  };
  onDelete?: () => void;
};

const getColorsConfigByType = (type: TransactionType) => {
  let config = {
    bgColor: Colors.red_100 as string,
  };

  switch (type) {
    case TransactionType.INCOME:
      config = {
        ...config,
        bgColor: Colors.green_100,
      };
      break;
    case TransactionType.EXPENSE:
      config = {
        ...config,
        bgColor: Colors.red_100,
      };
      break;
    case TransactionType.TRANSFER:
      config = {
        ...config,
        bgColor: Colors.blue_100,
      };
      break;
    default:
      break;
  }

  return config;
};

export default function ViewTransactinoScreen({ type, data, onDelete }: Props) {
  const config = getColorsConfigByType(type);

  const [bottomSheetIndex, setBottomSheetIndex] = React.useState(-1);

  const [isLoading, setIsLoading] = React.useState(false);

  const openBottomSheet = () => {
    setBottomSheetIndex(0);
  };

  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: config.bgColor,
    },
    viewBottomContainerStyles: {
      backgroundColor: Colors.light_100,
    },
    statusBarProps: {
      style: 'light',
    },
  });

  const handleDelete = () => {
    if (!onDelete) return;

    try {
      setIsLoading(true);
      onDelete?.();
      setBottomSheetIndex(-1);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const { styles, theme } = useStyles(StylesSheet);

  const isTransfer = type === TransactionType.TRANSFER;

  const {
    amount,
    description,
    files,
    createdAt,
    categoryOrFrom,
    walletOrTo,
    key,
  } = data;

  const editUrl =
    type === TransactionType.TRANSFER
      ? '/'
      : `/transactions/edit/transaction/${data.id}`;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return (
              <ScreenHeader
                title={`Detail Transaction - ${key}`}
                bgColor={config.bgColor}
                textColor={Colors.light_100}
                returnUrl='/main/home'
                rightIcon={
                  <Icon
                    name='Trash'
                    size={24}
                    color={Colors.light_100}
                    onPress={() => {
                      console.log('open bottom sheet');
                      openBottomSheet();
                    }}
                  />
                }
              />
            );
          },
        }}
      />

      <View style={styles.container}>
        <View style={styles.details}>
          <View
            style={[styles.rondedSection, { backgroundColor: config.bgColor }]}
          >
            <Typography
              color={theme.Colors.light_100}
              center
              style={{ lineHeight: 80, fontSize: 48 }}
              type='TitleX'
            >
              ${formatCurrency(amount)}
            </Typography>
            <Typography
              fontSize={18}
              style={{ lineHeight: 20, marginBottom: 8 }}
              color={theme.Colors.light_100}
              center
              type='Title1'
            >
              {description?.slice(0, 20)}
            </Typography>
            <Typography
              fontSize={18}
              style={{ lineHeight: 20, marginBottom: 8 }}
              color={theme.Colors.light_100}
              center
              type='Body1'
            >
              {formatDate(createdAt)}
            </Typography>
          </View>
          <View style={styles.categorization}>
            <View style={styles.categorizationSection}>
              <CategorizationItem
                title='Type'
                value={capitalizeFirstLetter(type.toLowerCase())}
              />
              <CategorizationItem
                title={isTransfer ? 'From' : 'Category'}
                value={categoryOrFrom}
              />
              <CategorizationItem
                title={isTransfer ? 'To' : 'Wallet'}
                value={walletOrTo}
              />
            </View>
          </View>
        </View>
        <View style={styles.description}>
          <View style={styles.divider} />
          <Typography color={Colors.light_20} type='Title4'>
            Description
          </Typography>
          <Typography
            fontSize={18}
            style={{ lineHeight: 20, textAlign: 'justify' }}
            type='Body1'
            color={Colors.dark_100}
          >
            {description}
          </Typography>
          <Typography color={Colors.light_20} type='Title4'>
            Attachment
          </Typography>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.attachment}
            >
              {files?.length > 0 ? (
                <>
                  {files.map((file, i) => (
                    <FileItem
                      containerSyles={{ width: 150 }}
                      key={i}
                      file={file}
                    />
                  ))}
                </>
              ) : (
                <Typography center color={Colors.light_20} type='Body1'>
                  No Attachments
                </Typography>
              )}
            </ScrollView>
          </View>

          <View style={styles.btnContainer}>
            <Link href={editUrl as any} asChild replace>
              <Button text='Edit' size='full' />
            </Link>
          </View>
        </View>
        <BottomSheet
          index={bottomSheetIndex}
          onChange={setBottomSheetIndex}
          snapPoints={['30%']}
        >
          <BottomSheetDecision
            onConfirm={handleDelete}
            onCancel={() => {
              setBottomSheetIndex(-1);
            }}
            isLoading={isLoading}
            title='Remove this transaction?'
            subtitle='Are you sure do you wanna remove this transaction?'
          />
        </BottomSheet>
      </View>
    </>
  );
}

const CategorizationItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: 46,
        justifyContent: 'space-evenly',
        gap: 8,
      }}
    >
      <Typography color={Colors.light_20} type='Body3'>
        {title}
      </Typography>
      <Typography color={Colors.dark_100} type='Title4'>
        {value}
      </Typography>
    </View>
  );
};

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.Colors.light_100,
    gap: 32,
  },
  details: {
    flex: 0.3,
    position: 'relative',
  },
  rondedSection: {
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  categorization: {
    position: 'absolute',
    width: '100%',
    bottom: -32,
    paddingHorizontal: 16,
    // zIndex: 10,
  },
  categorizationSection: {
    backgroundColor: theme.Colors.light_100,
    borderWidth: 1,
    borderColor: theme.Colors.light_60,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 12,
    height: 70,
  },
  divider: {
    height: 1,
    marginTop: 17,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: theme.Colors.light_40,
  },
  description: {
    flex: 0.8,
    paddingHorizontal: 16,
    gap: 16,
  },
  attachment: {
    gap: 8,
    paddingVertical: 5,
    height: 130,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
}));


import React, { useState } from 'react';
import { View } from 'react-native';
import Typography from '../typography';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { PillTab } from '../ui';
import Button from '../button';
import TabItem from '../tab/TabItem';
import Icon from '../icon';
import ModalSelectCategory from './ModalSelectCategory';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SortTransactionBy, TransactionType } from '@/interfaces';
import useCategories from '@/hooks/data/useCategories';
import { capitalizeFirstLetter } from '@/utils';
import useUserAccounts from '@/hooks/data/useUserAccounts';

type FilterValues = {
  types: TransactionType[];
  categories: string[];
  accounts: string[];
  sortBy: SortTransactionBy;
};

type TransactionFilterProps = {
  initialValues?: Partial<FilterValues>;
  onReset?: () => void;
  onSave?: (data: FilterValues) => void;
};

const sortByOptions = Object.values(SortTransactionBy);

const typeOptions = Object.values(TransactionType);

function TransactionFilter({
  initialValues,
  onReset,
  onSave,
}: TransactionFilterProps) {
  const { styles, theme } = useStyles(StylesSheet);

  const [showModalSelectCategory, setShowModalSelectCategory] = useState(false);

  const [showModalSelectAccount, setShowModalSelectAccount] = useState(false);

  const [filterData, setFilterData] = useState({
    types: initialValues?.types || [],
    categories: initialValues?.categories || [],
    accounts: initialValues?.accounts || [],
    sortBy: initialValues?.sortBy || ('' as any),
  });

  const { data: categories } = useCategories();

  const { data: accounts } = useUserAccounts();

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Typography type='Body2'>Filter Transaction</Typography>
        <PillTab
          label='Reset'
          color='violet'
          size='small'
          isActive
          isSingle
          onPressTab={() => onReset?.()}
          styles={{
            width: 70,
            flexGrow: 0,
          }}
        />
      </View>

      <View>
        <Typography style={{ marginBottom: 16 }} type='Body2'>
          Filter By
        </Typography>
        <View style={styles.filterTabsSection}>
          {typeOptions.map((item) => (
            <TabItem
              key={`filter_type_${item}`}
              text={capitalizeFirstLetter(item.toLowerCase())}
              isActive={filterData.types.includes(item)}
              fill
              onPressTab={() => {
                if (filterData.types.includes(item)) {
                  setFilterData({
                    ...filterData,
                    types: filterData.types.filter((type) => type !== item),
                  });
                } else {
                  setFilterData({
                    ...filterData,
                    types: [...filterData.types, item],
                  });
                }
              }}
            />
          ))}
        </View>
      </View>

      <View>
        <Typography style={{ marginBottom: 16 }} type='Body2'>
          Sort By
        </Typography>
        <View style={styles.filterTabsSection}>
          {sortByOptions.map((item, sortIdx) => (
            <TabItem
              key={`filter_sort_by_${item}`}
              text={capitalizeFirstLetter(item?.toLowerCase())}
              isActive={filterData.sortBy === item}
              fill={sortIdx !== sortByOptions.length - 1}
              onPressTab={() => setFilterData({ ...filterData, sortBy: item })}
            />
          ))}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.filterSection]}
          activeOpacity={0.5}
          onPress={() => setShowModalSelectCategory(true)}
        >
          <Typography type='Body2'>Choose Categories</Typography>
          <View style={styles.selectCategoryText}>
            <Typography color={theme.Colors.light_20} type='Body2'>
              {filterData.categories.length} Selected
            </Typography>
            <Icon
              name='ArrowRightNavigation'
              color={theme.Colors.violet_100}
              size={24}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 8 }}>
        <TouchableOpacity
          style={[styles.filterSection]}
          activeOpacity={0.5}
          onPress={() => setShowModalSelectAccount(true)}
        >
          <Typography type='Body2'>Choose Accounts</Typography>
          <View style={styles.selectCategoryText}>
            <Typography color={theme.Colors.light_20} type='Body2'>
              {filterData.accounts.length} Selected
            </Typography>
            <Icon
              name='ArrowRightNavigation'
              color={theme.Colors.violet_100}
              size={24}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button text='Apply' size='full' onPress={() => onSave?.(filterData)} />

      {showModalSelectCategory ? (
        <ModalSelectCategory
          open
          onSave={(result) => {
            setShowModalSelectCategory(false);
            setFilterData({
              ...filterData,
              categories: result
                ?.filter((item) => item.checked)
                .map((item) => item.value),
            });
          }}
          onClose={() => setShowModalSelectCategory(false)}
          items={
            categories?.map((item) => ({
              label: item.name,
              value: item.id,
              checked: filterData.categories.includes(item.id),
            })) || []
          }
        />
      ) : null}

      {showModalSelectAccount ? (
        <ModalSelectCategory
          title='Select Accounts'
          open
          onSave={(result) => {
            setShowModalSelectAccount(false);
            setFilterData({
              ...filterData,
              accounts: result
                ?.filter((item) => item.checked)
                .map((item) => item.value),
            });
          }}
          onClose={() => setShowModalSelectAccount(false)}
          items={
            accounts?.map((item) => ({
              label: item.name,
              value: item.id,
              checked: filterData.accounts.includes(item.id),
            })) || []
          }
        />
      ) : null}
    </View>
  );
}

export default TransactionFilter;

const StylesSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterTabsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  selectCategoryText: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
}));


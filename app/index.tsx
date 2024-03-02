import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewabilityConfig,
} from 'react-native';
import React, { useRef } from 'react';
import { assets } from '@/constants/assets';

const { width } = Dimensions.get('window');

const Item = ({ item }: { item: number }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'black',
        width,
        height: 250,
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Image
        source={assets.onboarding.gainControlOfYourMoney}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text>Item {item}</Text>
    </View>
  );
};

const items = [1, 2, 3, 4, 5, 6];
const config: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 51,
};
export default function MainView() {
  const [index, setIndex] = React.useState(0);

  const flashListRef = React.useRef<FlatList<number>>(null);

  const configList = useRef(config);

  const clickBullet = (index: number) => {
    if (flashListRef.current) {
      flashListRef?.current?.scrollToIndex?.({ index: index, animated: true });
    }
  };

  return (
    <View
      style={{
        marginTop: 100,
        height: 400,
      }}
    >
      <FlatList
        style={{ width: '100%', height: 200 }}
        horizontal
        data={items}
        pagingEnabled={true}
        onViewableItemsChanged={(a) => {
          console.log(a.viewableItems);
          if (a?.viewableItems[0]?.index !== null)
            setIndex(a?.viewableItems[0]?.index);
        }}
        viewabilityConfig={configList.current}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
        ref={flashListRef}
      />

      <StepList items={items} indexVisibled={index} onCLick={clickBullet} />
    </View>
  );
}

const StepList = ({
  items: itemsP,
  indexVisibled,
  onCLick,
}: {
  items: number[];
  indexVisibled: number;
  onCLick?: (number: number) => void;
}) => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        marginTop: 100,
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
      }}
    >
      {itemsP.map((item, idx) => (
        <Pressable
          onPress={() => {
            onCLick?.(idx);
          }}
          key={item}
          style={{
            width: 20,
            height: 20,
            backgroundColor: indexVisibled === idx ? 'blue' : 'black',
            borderRadius: 100,
          }}
        ></Pressable>
      ))}
    </View>
  );
};


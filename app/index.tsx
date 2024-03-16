import {
  Text,
  View,
  Image,
  FlatList,
  ViewabilityConfig,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  createStyleSheet,
  useStyles,
  UnistylesRuntime,
} from 'react-native-unistyles';
import { Link } from 'expo-router';

import Button from '@/components/button';
import { assets } from '@/constants/assets';

const onBoardingStepsData = [
  {
    key: 1,
    title: 'Gain total control\nof your money',
    description: 'Become your own money manager and make every cent count',
    img: assets.onboarding.gainControlOfYourMoney,
  },
  {
    key: 2,
    title: 'Know where your money goes',
    description:
      'Track your transaction easily, with categories and financial report ',
    img: assets.onboarding.moneyGoes,
  },
  {
    key: 3,
    title: 'Planning ahead',
    description: 'Setup your budget for each category so you in control',
    img: assets.onboarding.moneyPlan,
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const flashListRef = React.useRef<FlatList>(null);

  const config: ViewabilityConfig = {
    viewAreaCoveragePercentThreshold: 51,
  };

  const configList = React.useRef(config);

  const { styles } = useStyles(onBoardingScreenStyles);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfig={configList.current}
          onViewableItemsChanged={(a) => {
            const currentSlide = a?.viewableItems[0]?.index;
            if (currentSlide !== null && typeof currentSlide === 'number')
              setCurrentStep(currentSlide);
          }}
          data={onBoardingStepsData}
          renderItem={({ item }) => {
            return <OnboardingStep stepData={item} key={item.key} />;
          }}
          ref={flashListRef}
        />
      </View>
      <StepsIndicator
        totalItems={onBoardingStepsData.length}
        activeItemIndex={currentStep}
        onClickStep={(index) => {
          if (flashListRef.current) {
            flashListRef?.current?.scrollToIndex?.({ index, animated: true });
          }
        }}
      />

      <View style={styles.buttonContainer}>
        <Link href='/register' asChild>
          <Button size='full' text='Sign Up' />
        </Link>
        <Link href='/login' asChild>
          <Button variant='secondary' size='full' text='Login' />
        </Link>
      </View>
    </View>
  );
}

function OnboardingStep({
  stepData,
}: {
  stepData: (typeof onBoardingStepsData)[0];
}) {
  const { styles } = useStyles(onBoardingStepStyles);
  return (
    <View style={styles.container}>
      <View style={styles.img_container}>
        <Image style={styles.img} source={stepData.img} />
      </View>
      <View style={styles.text_container}>
        <Text numberOfLines={2} style={styles.title}>
          {stepData.title}
        </Text>
        <Text style={styles.description}>{stepData.description}</Text>
      </View>
    </View>
  );
}

function StepsIndicator({
  totalItems,
  activeItemIndex,
  onClickStep,
}: {
  totalItems: number;
  activeItemIndex: number;
  onClickStep?: (index: number) => void;
}) {
  const { styles: stepsStyles } = useStyles(StepsIndicatorStyles);

  return (
    <View style={stepsStyles.container}>
      {[...Array(totalItems)].map((_, index) => (
        <Pressable
          key={index}
          onPress={() => {
            onClickStep?.(index);
          }}
          style={stepsStyles.indicator(index === activeItemIndex)}
        />
      ))}
    </View>
  );
}

const StepsIndicatorStyles = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 33,
  },
  indicator(isActive: boolean) {
    return {
      width: isActive ? 16 : 8,
      height: isActive ? 16 : 8,
      borderRadius: 100,
      backgroundColor: isActive
        ? theme.Colors.violet_100
        : theme.Colors.light_20,
    };
  },
}));

const onBoardingStepStyles = createStyleSheet((theme) => ({
  container: {
    width: UnistylesRuntime.screen.width,
    paddingHorizontal: 20,
  },
  img_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  img: {
    maxWidth: 312,
    maxHeight: 312,
  },
  text_container: {
    alignItems: 'center',
  },
  title: {
    ...theme.Typography.Title1,
    color: theme.Colors.dark_50,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginBottom: 16,
  },
  description: {
    ...theme.Typography.Body1,
    color: theme.Colors.light_20,
    textAlign: 'center',
    maxWidth: 272,
  },
}));

const onBoardingScreenStyles = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 8,
    // paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const gainControlOfYourMoney = require('../assets/images/onboarding/gain_total_control_of_your_money.png');
const moneyGoes = require('../assets/images/onboarding/money_goes.png');
const moneyPlan = require('../assets/images/onboarding/plan.png');
const emailSend = require('../assets/images/onboarding/email_send.png');

//fonts
// const InterRegular = require('../assets/fonts/Inter-Regular.ttf');
const InterSemiBold = require('../assets/fonts/Inter-SemiBold.ttf');
const InterMedium = require('../assets/fonts/Inter-Medium.ttf');
const InterBold = require('../assets/fonts/Inter-Bold.ttf');

const fonts = {
  // InterRegular,
  InterSemiBold,
  InterMedium,
  InterBold,
} as const;

type FontNames = keyof typeof fonts;

export const fontNames: Record<FontNames, FontNames> = {
  // InterRegular: 'InterRegular',
  InterSemiBold: 'InterSemiBold',
  InterMedium: 'InterMedium',
  InterBold: 'InterBold',
} as const;

export const assets = {
  onboarding: {
    gainControlOfYourMoney,
    moneyGoes,
    moneyPlan,
    emailSend,
  },
  fonts,
};


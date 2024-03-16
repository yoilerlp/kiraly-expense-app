import { fontNames } from '@/constants/assets';
import type { TextStyle } from 'react-native';

export const Typography = {
  TitleX: {
    fontFamily: fontNames.InterBold,
    fontSize: 64,
    lineHeight: 80,
  },
  Title1: {
    fontFamily: fontNames.InterBold,
    fontSize: 32,
    lineHeight: 39,
  },
  Title2: {
    fontFamily: fontNames.InterSemiBold,
    fontSize: 24,
  },
  Title3: {
    fontFamily: fontNames.InterSemiBold,
    fontSize: 18,
  },
  Body1: {
    fontFamily: fontNames.InterMedium,
    fontSize: 16,
  },
  Body2: {
    fontFamily: fontNames.InterMedium,
    fontSize: 16,
  },
  Body3: {
    fontFamily: fontNames.InterMedium,
    fontSize: 14,
    lineHeight: 18,
  },
  Small: {
    fontFamily: fontNames.InterMedium,
    fontSize: 13,
    lineHeight: 16,
  },
  Tiny: {
    fontFamily: fontNames.InterMedium,
    fontSize: 12,
    lineHeight: 12,
  },
} as const;


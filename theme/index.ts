import { Colors } from './Colors';
import { fontNames } from '../constants/assets';
import { TypographyList } from './Typography';

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

export const margins = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

export const lightTheme = {
  Colors,
  Typography: TypographyList,
  FontNames: fontNames,
  margins,
} as const;


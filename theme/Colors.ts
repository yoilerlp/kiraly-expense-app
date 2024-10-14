const whiteColors = {
  light_20: '#91919F',
  light_40: '#F2F4F5',
  // light_60: '#F7F9FA',
  light_60: '#F1F1FA',
  light_80: '#FCFCFC',
  light_100: '#FFFFFF',
  white: 'white',
} as const;

export const BlackColors = {
  grayIcon: '#C6C6C6',

  dark_25: '#7A7E80',
  dark_50: '#212325',
  dark_75: '#161719',
  dark_100: '#0D0E0F',
} as const;

const yellowGradient = {
  start: '#FFF6E5',
  end: 'rgba(255, 246, 229, 0.2)',
} as const;

export const VioletColors = {
  violet_20: '#EEE5FF',
  violet_40: '#D3BDFF',
  violet_60: '#B18AFF',
  violet_80: '#8F57FF',
  violet_100: '#7F3DFF',
} as const;

export const RedColors = {
  red_20: '#FDD5D7',
  red_40: '#FDA2A9',
  red_60: '#FD6F7A',
  red_80: '#FD5662',
  red_100: '#FD3C4A',
} as const;

export const GreenColors = {
  green_20: '#CFFAEA',
  green_40: '#93EACA',
  green_60: '#65D1AA',
  green_80: '#2AB784',
  green_100: '#00A86B',
} as const;

export const BlueColors = {
  blue_20: '#BDDCFF',
  blue_40: '#8AC0FF',
  blue_60: '#57A5FF',
  blue_80: '#248AFF',
  blue_100: '#0077FF',
} as const;

export const YellowColors = {
  yellow_20: '#FCEED4',
  yellow_40: '#FCDDA1',
  yellow_60: '#FCCC6F',
  yellow_80: '#FCBB3C',
  yellow_100: '#FCAC12',
} as const;

export const ThemeColors = {
  ...VioletColors,
  ...RedColors,
  ...GreenColors,
  ...BlueColors,
  ...YellowColors,
};

export const Colors = {
  ...whiteColors,
  ...BlackColors,
  ...ThemeColors,
  // gradianst
  yellowGradient,
} as const;


import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // colors
  primary: '#8a1776',
  success: '#5cb85c',
  error: '#d9534f',
  waring: '#f0ad4e',
  pinkPastel: '#8a1776',
  pinkText: '#8a1776',
  bluePastel: '#b72065',
  onboarding1: '#b72065',
  onboarding2: '#7d0281',
  onboarding3: '#b91e66',
  onboarding4: '#8a1776',
  inactiveColor: '#C4BABA',
  inputPlaceholderColor: '#C8C8C8',
  greyText: '#aaaaaa',
  background: '#fafafa',
  startDate: '#b72065',
  endDate: '#b72065',
  pickedRangeDate: '#70d7c7',
  pickedDateText: '#fff',
  backgroundColor: '#fbfcfc',
  link: '#2196f3',
  black: '#000',
  buttonBlue: '#0CBCFD',
  greenLine: '#00C300',
  white: '#fff',
  lightGrey: '#eceff1',
  opcaityBlack: 'rgba(0,0,0,0.6)',
};

export const Radius = {
  xs: 3,
  s: 5,
  m: 10,
  l: 15,
  xl: 20,
};

export const SHADOW = {
  default: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 5,
  },
};

export const SIZES = {
  // global sizes
  base: 8,

  padding: 20,

  // font sizes
  navTitle: 25,
  h1: 18,
  h2: 16,
  h3: 14,
  h4: 12,
  h5: 10,
  body1: 18,
  body2: 16,
  body3: 14,
  body4: 12,
  body5: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  default: 'SFProText-Regular',
  onboardinghero: {
    fontSize: 50,
    fontFamily: 'SFProText-Bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  h1: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.h1,
    lineHeight: 24,
  },
  h2: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.h2,
    lineHeight: 22,
  },
  h3: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.h3,
    lineHeight: 20,
  },
  h4: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.h4,
    lineHeight: 18,
  },
  h5: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.h5,
    lineHeight: 16,
  },
  body1: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body1,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body2,
    lineHeight: 22,
  },
  body3: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body3,
    lineHeight: 20,
  },
  body4: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body4,
    lineHeight: 18,
  },
  body5: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body5,
    lineHeight: 16,
  },
  button: {
    fontFamily: 'SFProText-Bold',
    fontSize: SIZES.body4,
    lineHeight: 14,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;

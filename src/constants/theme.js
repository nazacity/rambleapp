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
  backgroundColor: '#fff',
  link: '#2196f3',
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
};

export const SIZES = {
  // global sizes
  base: 8,
  radius: {
    small: 5,
    medium: 10,
    large: 20,
  },
  padding: 20,

  // font sizes
  navTitle: 25,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 24,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  default: 'SFProText-Regular',
  onboardinghero: {
    fontSize: 50,
    fontFamily: 'SF-Pro-Text-Bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
  },
  h1: {fontFamily: 'SFProText-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'SFProText-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'SFProText-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'SFProText-Bold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'SFProText-Bold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body1,
    lineHeight: 30,
  },
  body2: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'SFProText-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;

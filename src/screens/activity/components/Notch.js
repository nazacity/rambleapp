import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const Notch = (props) => {
  return <View style={styles.root} {...props} />;
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});

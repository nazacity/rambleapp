import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const ContestNo = ({contest_no}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View
      style={[
        {
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          padding: 20,
        },
        SHADOW.default,
      ]}>
      <View>
        <Text style={[FONTS.h4, {textAlign: 'center'}]}>
          {t('activity.contestno')}
        </Text>
        <Text style={[FONTS.contestno, {textAlign: 'center'}]}>
          {contest_no ? contest_no : 'รอประกาศ'}
        </Text>
      </View>
    </View>
  );
};

export default ContestNo;

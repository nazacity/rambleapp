import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import ImageModal from 'react-native-image-modal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const ContestNo = ({contest_no}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.contestno')} />
      <View style={{marginLeft: 20}}>
        <Text style={[FONTS.h4]}>{contest_no ? contest_no : 'รอประกาศ'}</Text>
      </View>
    </View>
  );
};

export default ContestNo;

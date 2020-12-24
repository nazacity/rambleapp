import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const MoreInfomation = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.moredetail')} />
      <View style={{paddingLeft: 20}}>
        {activity.more_detail.map((item, index) => {
          return (
            <View key={index}>
              <Text style={[FONTS.body4]}>{item.description}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MoreInfomation;

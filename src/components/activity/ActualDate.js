import React from 'react';
import {View, Text} from 'react-native';
import {FONTS} from '../../constants';
import moment from 'moment';
import 'moment/locale/th';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const ActualDate = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.actual_date')} />
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <Text style={[FONTS.body3]}>
          {moment(activity.actual_date).format('DD MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default ActualDate;

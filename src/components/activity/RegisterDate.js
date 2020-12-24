import React from 'react';
import {View, Text} from 'react-native';
import {FONTS} from '../../constants';
import moment from 'moment';
import 'moment/locale/th';
import {useSelector} from 'react-redux';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const RegisterDate = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.register_date')} />
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <Text style={[FONTS.body3]}>
          {moment(activity.register_start_date).format('DD MMMM YYYY')}
        </Text>
        <Text style={[FONTS.body3, {marginHorizontal: 10}]}>-</Text>
        <Text style={[FONTS.body3]}>
          {moment(activity.register_end_date).format('DD MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default RegisterDate;

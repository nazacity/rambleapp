import React from 'react';
import {View, Text} from 'react-native';
import {FONTS} from '../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import {useSelector} from 'react-redux';

const ActualDate = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  dayjs.locale(lang);
  return (
    <View>
      <TitleHeader title={t('activity.actual_date')} />
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <Text style={[FONTS.body3]}>
          {dayjs(activity.actual_date).format('D MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default ActualDate;

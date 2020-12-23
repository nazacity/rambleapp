import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';

import {FONTS, COLORS} from '../../constants';
import CalendarModal from '../../components/modal/CalendarModal';
import moment from 'moment';
import 'moment/locale/th';
import LocalizationContext from '../LocalizationContext';
moment.locale('th');

const ActivityFilterScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [course, setCourse] = useState({});
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24 * 10),
  });

  const handleCalendarModalClose = () => {
    setCalendarModalOpen(false);
  };

  const onSubmit = (data) => {
    // dispatch(setLoading(true));
    // setTimeout(() => {
    //   dispatch(signIn(data));
    // }, 1000);

    navigation.navigate('Activity');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: COLORS.background, padding: 20}}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            placeholder={t('createpost.province')}
            placeholderTextColor={COLORS.inputPlaceholderColor}
            inputContainerStyle={[
              {
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                fontFamily: 'SF-Pro-Text-Regular',
              },
              {
                borderColor: focus.province
                  ? COLORS.pinkPastel
                  : COLORS.inputPlaceholderColor,
              },
            ]}
            inputStyle={{fontFamily: 'SF-Pro-Text-Regular'}}
            onChangeText={(value) => onChange(value)}
            value={value}
            onFocus={() => {
              setFocus({...focus, province: true});
            }}
            onBlur={() => {
              setFocus({...focus, province: false});
            }}
          />
        )}
        name="province"
        // rules={{required: true}}
        defaultValue=""
      />
      <View style={{marginBottom: 20}}>
        <Text style={[FONTS.h2]}>{t('activityfilter.course')}</Text>
        <CheckBox
          title={t('activityfilter.5')}
          checked={course.less5}
          onPress={() => setCourse({...course, less5: !course.less5})}
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('activityfilter.6-10')}
          checked={course.between6to10}
          onPress={() =>
            setCourse({...course, between6to10: !course.between610})
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('activityfilter.11-20')}
          checked={course.between10to20}
          onPress={() =>
            setCourse({...course, between10to20: !course.between10to20})
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('activityfilter.21-40')}
          checked={course.between20to40}
          onPress={() =>
            setCourse({...course, between20to40: !course.between20to40})
          }
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
        <CheckBox
          title={t('activityfilter.40')}
          checked={course.more40}
          onPress={() => setCourse({...course, more40: !course.more40})}
          containerStyle={{borderWidth: 0, padding: 0}}
          checkedColor={COLORS.pinkPastel}
          textStyle={[FONTS.h3]}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <Text style={[FONTS.h2]}>{t('activityfilter.during')}</Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: COLORS.inputPlaceholderColor,
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <Text style={[FONTS.body3]}>
            {moment(selectedDate.startDate).format('DD MMMM YYYY')}
          </Text>
          <Text style={[FONTS.body3, {marginHorizontal: 5}]}>-</Text>
          <Text style={[FONTS.body3]}>
            {moment(selectedDate.endDate).format('DD MMMM YYYY')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{position: 'absolute', right: 10}}
            onPress={() => {
              setCalendarModalOpen(true);
            }}>
            <Ionicons name="ios-calendar" size={30} color={COLORS.pinkPastel} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          label={t('activityfilter.find')}
          color={COLORS.pinkPastel}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <CalendarModal
        open={calendarModalOpen}
        handleClose={handleCalendarModalClose}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </ScrollView>
  );
};

export default ActivityFilterScreen;

const styles = StyleSheet.create({});

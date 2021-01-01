import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';

import {FONTS, COLORS, SIZES} from '../../constants';
import RangeCalendarModal from '../../components/modal/RangeCalendarModal';
import moment from 'moment';
import 'moment/locale/th';
import {useSelector, useDispatch} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import BackButton from '../../components/layout/BackButton';
import TitleHeader from '../../components/layout/TitleHeader';
import {get} from '../../redux/actions/request';
import DropDownPicker from 'react-native-dropdown-picker';
import {regionEnum} from '../../constants/provinces';
import {setFilActivities} from '../../redux/actions/ActivityAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import RangeSlider from 'rn-range-slider';
import Thumb from './components/Thumb';
import Rail from './components/Rail';
import RailSelected from './components/RailSelected';
import Label from './components/Label';
import Notch from './components/Notch';

const ActivityFilterScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const lang = useSelector((state) => state.appState.lang);
  moment.locale(lang);
  const dispatch = useDispatch();
  // const activities = useSelector((state) => state.activity.filtered_activities);
  const {control, handleSubmit, errors} = useForm();
  const [focus, setFocus] = useState({});
  const [distance, setDistance] = useState({
    min: 0,
    max: 100,
  });
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24 * 10),
  });

  const handleCalendarModalClose = () => {
    setCalendarModalOpen(false);
  };

  const onSubmit = async (data) => {
    if (!data.region) {
      Alert.alert(
        t('activityfilter.noregion'),
        t('activityfilter.selectregion'),
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      dispatch(setLoading(true));
      try {
        const res = await get(
          `/api/users/getactivities?region=${data.region}&from=${selectedDate.startDate}&to=${selectedDate.endDate}&range_min=${distance.min}&range_max=${distance.max}&limit=50`,
        );

        if (res.status === 200) {
          dispatch(setFilActivities([...res.data]));
        }
        dispatch(setLoading(false));
        navigation.navigate('FilteredActivity');
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setDistance({min: low, max: high});
  }, []);

  return (
    <View
      style={{
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
        padding: 20,
        paddingTop: 60,
      }}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleHeader title={t('activityfilter.region')} />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <DropDownPicker
              items={regionEnum}
              placeholder={t('activityfilter.selectone')}
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                },
                {
                  borderColor: focus.region
                    ? COLORS.pinkPastel
                    : COLORS.inputPlaceholderColor,
                  height: 50,
                },
              ]}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              zIndex={5000}
              dropDownStyle={{
                backgroundColor: COLORS.backgroundColor,
                width: SIZES.width - 42,
                marginTop: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: COLORS.pinkPastel,
                zIndex: 400,
              }}
              onChangeItem={(item) => {
                onChange(item.value);
              }}
              onOpen={() => {
                setFocus({...focus, region: true});
              }}
              onClose={() => {
                setFocus({...focus, region: false});
              }}
            />
          )}
          name="region"
          // rules={{required: true}}
          defaultValue=""
        />
        <View style={{marginVertical: 20, zIndex: -10}}>
          <TitleHeader title={t('activityfilter.course')} />

          <RangeSlider
            style={styles.slider}
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
        <View style={{marginBottom: 20}}>
          <TitleHeader title={t('activityfilter.during')} />
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
              {moment(selectedDate.startDate).format('DD MMM YYYY')}
            </Text>
            <Text style={[FONTS.body3, {marginHorizontal: 5}]}>-</Text>
            <Text style={[FONTS.body3]}>
              {moment(selectedDate.endDate).format('DD MMM YYYY')}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{position: 'absolute', right: 10}}
              onPress={() => {
                setCalendarModalOpen(true);
              }}>
              <Ionicons
                name="ios-calendar"
                size={30}
                color={COLORS.pinkPastel}
              />
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
        <RangeCalendarModal
          open={calendarModalOpen}
          handleClose={handleCalendarModalClose}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </ScrollView>
    </View>
  );
};

export default ActivityFilterScreen;

const styles = StyleSheet.create({});

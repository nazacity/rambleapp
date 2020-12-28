import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {SIZES, FONTS, COLORS} from '../../constants';
// import {Calendar, defaultStyle, LocaleConfig} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

// LocaleConfig.locales['th'] = {
//   monthNames: [
//     'มกราคม',
//     'กุมภาพันธ์',
//     'มีนาคม',
//     'เมษายน',
//     'พฤษภาคม',
//     'มิถุนายน',
//     'กรกฏาคม',
//     'สิงหาคม',
//     'กันยายน',
//     'ตุลาคม',
//     'พฤศจิกายน',
//     'ธันวาคม',
//   ],
// monthNamesShort: [
//   'ม.ค.',
//   'ก.พ.',
//   'มี.ค.',
//   'เม.ย.',
//   'พ.ค.',
//   'มิ.ย.',
//   'ก.ค.',
//   'ส.ค.',
//   'ก.ย.',
//   'ต.ค.',
//   'พ.ย.',
//   'ธ.ค.',
// ],
//   dayNames: [
//     'วันอาทิตย์',
//     'วันจันทร์',
//     'วันอังคาร',
//     'วันพุธ',
//     'วันพฤหัสบดี',
//     'วันศุกร์',
//     'วันเสาร์',
//   ],
//   dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
//   today: 'วันนี้',
// };

const CalendarModal = ({open, handleClose, selectedDate, setSelectedDate}) => {
  const lang = useSelector((state) => state.appState.lang);
  // LocaleConfig.defaultLocale = 'th';

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}>
      <View
        style={{
          height: SIZES.height / 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <CalendarPicker
          weekdays={
            lang === 'th'
              ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
              : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          }
          months={
            lang === 'th'
              ? [
                  'ม.ค.',
                  'ก.พ.',
                  'มี.ค.',
                  'เม.ย.',
                  'พ.ค.',
                  'มิ.ย.',
                  'ก.ค.',
                  'ส.ค.',
                  'ก.ย.',
                  'ต.ค.',
                  'พ.ย.',
                  'ธ.ค.',
                ]
              : [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ]
          }
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
          selectedDayColor={COLORS.endDate}
          selectedDayTextColor={COLORS.pickedDateText}
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});

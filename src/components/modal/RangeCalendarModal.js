import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {SIZES, FONTS, COLORS} from '../../constants';
import {useSelector} from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarModal = ({open, handleClose, selectedDate, setSelectedDate}) => {
  const lang = useSelector((state) => state.appState.lang);
  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down']}>
      <View
        style={{
          height: SIZES.height / 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        {/* <DateRangePicker
          minDate={new Date()}
          initialRange={
            selectedDate.startDate && selectedDate.endDate
              ? [selectedDate.startDate, selectedDate.endDate]
              : undefined
          }
          onSuccess={(s, e) => {
            setSelectedDate({
              startDate: s,
              endDate: e,
            });
          }}
          theme={{markColor: 'blue', markTextColor: 'white'}}
        /> */}
        <CalendarPicker
          allowRangeSelection={true}
          minDate={new Date()}
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
          onDateChange={(date, type) => {
            if (type === 'END_DATE') {
              setSelectedDate({
                ...selectedDate,
                endDate: date,
              });
            } else {
              setSelectedDate({
                startDate: date,
                endDate: null,
              });
            }
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

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {SIZES, FONTS, COLORS} from '../../constants';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';

const DatePickerModal = ({
  open,
  handleClose,
  selectedDate,
  setSelectedDate,
}) => {
  const lang = useSelector((state) => state.appState.lang);
  // LocaleConfig.defaultLocale = 'th';

  return (
    <Modal
      isVisible={open}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <DatePicker
          mode="date"
          date={selectedDate}
          onDateChange={setSelectedDate}
          locale={lang}
          textColor={COLORS.primary}
        />
      </View>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({});

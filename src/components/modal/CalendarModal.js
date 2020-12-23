import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {SIZES, FONTS, COLORS} from '../../constants';
import DateRangePicker from './DateRangePicker';

const CalendarModal = ({open, handleClose, selectedDate, setSelectedDate}) => {
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
        <DateRangePicker
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
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({});

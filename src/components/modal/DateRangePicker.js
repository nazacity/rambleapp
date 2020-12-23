import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, defaultStyle, LocaleConfig} from 'react-native-calendars';
import {COLORS} from '../../constants';

LocaleConfig.locales['th'] = {
  monthNames: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฏาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],
  monthNamesShort: [
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
  ],
  dayNames: [
    'วันอาทิตย์',
    'วันจันทร์',
    'วันอังคาร',
    'วันพุธ',
    'วันพฤหัสบดี',
    'วันศุกร์',
    'วันเสาร์',
  ],
  dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  today: 'วันนี้',
};

LocaleConfig.defaultLocale = 'th';

const XDate = require('xdate');

const DateRangePicker = (props) => {
  const [state, setState] = useState({});
  useEffect(() => {
    setupInitialRange();
  }, []);

  const onDayPress = (day) => {
    if (
      !state.isFromDatePicked ||
      (state.isFromDatePicked && state.isToDatePicked)
    ) {
      setupStartMarker(day);
    } else if (!state.isToDatePicked) {
      let markedDates = {...state.markedDates};
      let [mMarkedDates, range] = setupMarkedDates(
        state.fromDate,
        day.dateString,
        markedDates,
      );
      if (range >= 0) {
        setState({
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates,
        });
        props.onSuccess(state.fromDate, day.dateString);
      } else {
        setupStartMarker(day);
      }
    }
  };

  const setupStartMarker = (day) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: COLORS.startDate,
        textColor: COLORS.pickedDateText,
      },
    };
    setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates,
    });
  };

  const setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);

    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          ...markedDates,
          [toDate]: {
            color: COLORS.endDate,
            textColor: COLORS.pickedDateText,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: COLORS.pickedRangeDate,
              textColor: COLORS.pickedDateText,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: COLORS.endDate,
              textColor: COLORS.pickedDateText,
            };
          }
        }
      }
    }

    return [markedDates, range];
  };

  const setupInitialRange = () => {
    if (!props.initialRange) return;
    let [fromDate, toDate] = props.initialRange;
    let mFromDate = new XDate(fromDate).toString('yyyy-MM-dd');
    let markedDates = {
      [mFromDate]: {
        startingDay: true,
        color: '#50cebb',
        textColor: 'white',
      },
    };

    let [mMarkedDates, range] = setupMarkedDates(fromDate, toDate, markedDates);

    setState({markedDates: mMarkedDates, fromDate: fromDate});
  };

  return (
    <Calendar
      {...props}
      markingType={'period'}
      current={state.fromDate}
      markedDates={state.markedDates}
      onDayPress={(day) => {
        onDayPress(day);
      }}
    />
  );
};

export default DateRangePicker;

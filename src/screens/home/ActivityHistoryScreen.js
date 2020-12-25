import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import RecordCard from '../../components/card/RecordCard';

const HistoryActivityScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const {userActivity} = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 100,
        }}></View>
      <RecordCard item={userActivity} />
    </ScrollView>
  );
};

export default HistoryActivityScreen;

const styles = StyleSheet.create({});

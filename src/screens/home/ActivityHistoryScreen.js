import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {FONTS, COLORS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import RecordCard from '../../components/card/RecordCard';
import BackButton from '../../components/layout/BackButton';

const HistoryActivityScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const {userActivity} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 100,
          }}></View>
        <RecordCard item={userActivity} />
      </ScrollView>
    </View>
  );
};

export default HistoryActivityScreen;

const styles = StyleSheet.create({});

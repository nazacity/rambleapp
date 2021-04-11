import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {SIZES, COLORS, FONTS, SHADOW} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const TimelineDisplay = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View
      style={[
        {
          borderRadius: 10,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          alignItems: 'center',
          marginVertical: 20,
          marginHorizontal: 5,
        },
        SHADOW.default,
      ]}>
      <TitleHeader title={t('activity.detail')} noDot={true} />
      <ScrollView horizontal style={{marginTop: 10}} scrollEnabled={false}>
        <View style={{width: 300}}>
          <Timeline
            scrollEnabled={false}
            data={activity.timeline}
            circleColor={COLORS.onboarding1}
            titleStyle={[{color: '#000'}, FONTS.body3]}
            descriptionStyle={[{color: 'gray'}, FONTS.body4]}
            lineColor={COLORS.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TimelineDisplay;

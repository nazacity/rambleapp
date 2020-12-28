import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {SIZES, COLORS, FONTS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';

const TimelineDisplay = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.detail')} />
      <ScrollView horizontal style={{marginTop: 20}}>
        <View style={{width: SIZES.width - 40}}>
          <Timeline
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

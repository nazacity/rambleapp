import React from 'react';
import {Text, View} from 'react-native';
import {FONTS} from '../../constants';

const Description = ({activity}) => {
  return (
    <View style={{marginBottom: 20}}>
      <Text style={[FONTS.body2, {marginBottom: 20}]}>
        {activity.sub_title}
      </Text>
      <Text style={[FONTS.body4]}>{activity.description}</Text>
    </View>
  );
};

export default Description;

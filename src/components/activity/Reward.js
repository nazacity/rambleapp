import React from 'react';
import {View, Text} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {FONTS, COLORS} from '../../constants';
import TitleHeader from '../layout/TitleHeader';

const Reward = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{marginBottom: 20}}>
      <TitleHeader title={t('activity.rule')} />
      {activity.rules.map((item, index) => {
        return (
          <View key={index} style={{paddingHorizontal: 20, marginBottom: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <Text style={[FONTS.h4]}>{item.title}</Text>
            </View>
            <View style={{paddingLeft: 40}}>
              {item.detail &&
                item.detail.map((item, index) => {
                  return (
                    <View key={index}>
                      <Text style={[FONTS.body4]}>{item.description}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Reward;

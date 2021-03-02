import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {FONTS} from '../../../constants';

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  const lang = useSelector((state) => state.appState.lang);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={[
            FONTS.body3,
            {
              color: 'white',
              textTransform: 'uppercase',
            },
          ]}>
          {lang === 'th' && item.title_th}
          {lang === 'en' && item.title_en}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default Tab;

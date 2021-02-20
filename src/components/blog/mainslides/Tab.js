import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS} from '../../../constants';

const Tab = React.forwardRef(({item, onItemPress, data}, ref) => {
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
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default Tab;

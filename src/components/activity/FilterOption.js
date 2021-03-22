import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW} from '../../constants';

const FilterOption = ({state, setState, filterOption}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={filterOption}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={{padding: 20}}
      ItemSeparatorComponent={() => <View style={{margin: 5}} />}
      renderItem={({item, index}) => {
        return (
          <View
            style={[
              SHADOW.default,
              {
                backgroundColor: COLORS.backgroundColor,
                borderRadius: 5,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                height: 50,
                width: 150,
                backgroundColor: COLORS.backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: state === item.id ? 1 : 0,
                borderColor: COLORS.primary,
              }}
              onPress={() => {
                item.function();
                setState(item.id);
              }}>
              <Text style={[FONTS.h4]}>{item.item}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default FilterOption;

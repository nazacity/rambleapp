import React, {useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';

const FilterOption = ({
  state,
  setState,
  filterOption,
  filterRef,
  ViewButtonDisplay,
}) => {
  const lang = useSelector((state) => state.appState.lang);
  return (
    <FlatList
      ref={filterRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={ViewButtonDisplay}
      data={filterOption}
      keyExtractor={(item) => `${item.id}`}
      style={{width: 50}}
      contentContainerStyle={{
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingVertical: 2,
      }}
      ItemSeparatorComponent={() => <View style={{marginHorizontal: 5}} />}
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
                filterRef.current.scrollToIndex({
                  animated: true,
                  index: index,
                  viewOffset: SIZES.width / 2 - 100,
                });
                item.function();
                setState(item.id);
              }}>
              <Text style={[FONTS.h4]}>
                {lang === 'th' && item.item_th}
                {lang === 'en' && item.item_en}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default FilterOption;

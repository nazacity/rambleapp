import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import {FONTS, COLORS, SIZES} from '../../constants';
import {advertise} from '../../config/data';

const MainAdvertise = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 40}}>
      {advertise.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => {}}
            style={{
              width: SIZES.width - 40,
              height: 200,
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 20,
            }}>
            <Image
              source={{uri: item.activity_picture_url}}
              style={{width: SIZES.width - 40, height: 200, borderRadius: 5}}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MainAdvertise;

const styles = StyleSheet.create({});

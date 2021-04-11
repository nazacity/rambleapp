import React, {useEffect, useState, useRef} from 'react';
import {Text, View, FlatList, Animated, ActivityIndicator} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES} from '../../constants';
import MenuButton from '../../components/layout/MenuButton';
import LocalizationContext from '../LocalizationContext';
import {get} from '../../redux/actions/request';
import UserYearRecordCard from '../../components/card/UserYearRecordCard';

const HistoryActivityScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);

  const getUserRecords = async () => {
    try {
      const res = await get('/api/users/getuseryearrecords');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRecords();
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <MenuButton />
      {data.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            style={{padding: 10}}
            size={40}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => `${item._id} ${index}`}
          renderItem={({item, index}) => {
            return <UserYearRecordCard data={item} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 5}} />}
          style={{paddingTop: 60}}
          contentContainerStyle={{
            padding: 5,
            justifyContent: 'center',
          }}
          ListFooterComponent={() => <View style={{marginBottom: 100}} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      )}
    </View>
  );
};

export default HistoryActivityScreen;

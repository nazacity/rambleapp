import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {FONTS, COLORS, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/AppStateAction';
import {get} from '../../redux/actions/request';

const MainAdvertise = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mainAdvertizes, setMainAdvertizes] = useState([]);

  const fetchMainAdvertizes = async () => {
    dispatch(setLoading(true));
    try {
      const res = await get('/api/everyone/mainadvertize');
      if (res.status === 200) {
        setMainAdvertizes(res.data);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMainAdvertizes();
  }, []);

  return (
    <ScrollView horizontal>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mainAdvertizes}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('WebView', {
                  uri: item.uri,
                });
              }}
              style={{
                width: SIZES.width - 40,
                height: 200,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.advertize_picture_url}}
                style={{width: SIZES.width - 40, height: 200, borderRadius: 5}}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        contentContainerStyle={{
          padding: 20,
          alignItems: 'center',
          marginVertical: 20,
        }}
      />
    </ScrollView>
  );
};

export default MainAdvertise;

const styles = StyleSheet.create({});

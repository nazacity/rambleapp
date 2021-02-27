import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions/AppStateAction';
import {get} from '../../redux/actions/request';
import TitleHeader from '../layout/TitleHeader';
import LocalizationContext from '../../screens/LocalizationContext';

const MainAdvertise = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mainAdvertizes, setMainAdvertizes] = useState([]);
  const {t} = React.useContext(LocalizationContext);
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
    <View
      style={{
        paddingHorizontal: 20,
      }}>
      <TitleHeader
        title={t('community.trend')}
        // seeAll={() => {
        //   navigation.jumpTo('community', {
        //     screen: 'Blogs',
        //     params: {
        //       blogCategoryId: item._id,
        //       picture_url: item.picture_url,
        //       title:
        //         lang === 'th' ? item.title_th : lang === 'en' && item.title_en,
        //     },
        //   });
        // }}
        noDot={true}
      />
      {mainAdvertizes.map((item) => {
        return (
          <View
            key={item._id}
            style={[
              {
                width: SIZES.width - 40,
                height: 200,
                borderRadius: 10,
                backgroundColor: COLORS.backgroundColor,
                marginVertical: 10,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('WebView', {
                  uri: item.uri,
                });
              }}
              style={[
                {
                  width: SIZES.width - 40,
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: COLORS.backgroundColor,
                  overflow: 'hidden',
                },
              ]}>
              <Image
                source={{uri: item.advertize_picture_url}}
                style={{width: SIZES.width - 40, height: 200, borderRadius: 5}}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default MainAdvertise;

const styles = StyleSheet.create({});

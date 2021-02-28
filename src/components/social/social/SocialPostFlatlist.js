import React from 'react';
import {View, Text, ImageBackground, FlatList, Image} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
import BackButton from '../../layout/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import SocialPostCard from './SocialPostCard';
import {postSocial} from '../../../redux/actions/request';
import {ActivityIndicator} from 'react-native';

const SocialFlatlist = ({picture_url, title, data, loading, fetchPosts}) => {
  return (
    <View>
      <BackButton />
      <FlatList
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={data}
        ListHeaderComponent={() => (
          <View
            style={{
              width: SIZES.width,
              height: 300,
              overflow: 'hidden',
              marginBottom: 40,
              position: 'relative',
            }}>
            <ImageBackground
              source={{uri: picture_url}}
              style={{
                resizeMode: 'cover',
                width: SIZES.width,
                height: 300,
                position: 'relative',
              }}>
              <LinearGradient
                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                useAngle
                angle={180}
                style={{
                  flex: 1,
                  left: 0,
                  top: 0,
                  width: SIZES.width,
                  height: 300,
                }}
              />
              <View
                style={{
                  width: SIZES.width,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                  }}>
                  {title}
                </Text>
              </View>

              <View
                style={{
                  height: 100,
                  borderTopLeftRadius: 75,
                  backgroundColor: COLORS.backgroundColor,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <Image
                source={require('../../../../assets/boderradius/bottomright.png')}
                style={{width: 100, height: 100}}
                style={{
                  height: 100,
                  position: 'absolute',
                  bottom: 100,
                  right: 0,
                }}
              />
            </ImageBackground>
          </View>
        )}
        ListHeaderComponentStyle={{marginBottom: -100}}
        keyExtractor={(item, index) => item._id}
        // keyExtractor={(item, index) => `${index}`}
        // ItemSeparatorComponent={() => <View style={{margin: 10}} />}

        renderItem={({item, index}) => {
          return <SocialPostCard item={item} index={index} />;
        }}
        ListFooterComponent={
          <View style={{marginBottom: 100}}>
            {loading && (
              <View style={{flex: 1, marginBottom: 50}}>
                <ActivityIndicator color={COLORS.primary} size={24} />
              </View>
            )}
          </View>
        }
        onEndReached={fetchPosts}
        onEndReachedThreshold={10}
      />
    </View>
  );
};

export default SocialFlatlist;

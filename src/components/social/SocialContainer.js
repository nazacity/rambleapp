import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import SocialFlatlist from './social/SocialFlatlist';
import LinearGradient from 'react-native-linear-gradient';

const SocialContainer = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const user_activities = useSelector((state) => state.user.user_activities);

  return (
    <View>
      <View style={{height: SIZES.width / 2, flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: SIZES.width / 2}}
          onPress={() => {
            navigation.navigate('SocialCommunity');
          }}>
          <ImageBackground
            source={{
              uri:
                'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={{
              width: SIZES.width / 2,
              height: SIZES.width / 2,
              resizeMode: 'cover',
            }}>
            <LinearGradient
              colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              useAngle
              angle={180}
              style={{
                flex: 1,
                left: 0,
                top: 0,
                width: SIZES.width / 2,
                height: SIZES.width / 2,
              }}
            />
            <View style={{position: 'absolute', top: 10, left: 10}}>
              <Text style={[FONTS.body2, {color: COLORS.white}]}>
                Social Community
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: SIZES.width / 2}}
          onPress={() => {
            navigation.navigate('SelectActivity');
          }}>
          <ImageBackground
            source={{
              uri:
                'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={{
              width: SIZES.width / 2,
              height: SIZES.width / 2,
              resizeMode: 'cover',
            }}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              useAngle
              angle={180}
              style={{
                flex: 1,
                left: 0,
                top: 0,
                width: SIZES.width / 2,
                height: SIZES.width / 2,
              }}
            />
            <View style={{position: 'absolute', bottom: 10, right: 10}}>
              <Text style={[FONTS.body2, {color: COLORS.white}]}>
                Sharing Community
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialContainer;

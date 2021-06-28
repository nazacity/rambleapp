import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, ImageBackground, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import LinearGradient from 'react-native-linear-gradient';
import SocialCategoryContainer from './SocialCategoryContainer';
import SocialActivityContainer from './SocialActivityContainer';

const SocialContainer = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  return (
    <View>
      <View style={{height: 100, flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: SIZES.width}}
          onPress={() => {
            if (user.vefiry_information.state === 'verified') {
              navigation.navigate('SelectActivity');
            } else {
              Alert.alert(
                t('activity.noverified'),
                t('activity.pleaseverify'),
                [
                  {
                    text: t('community.comment.okay'),
                    onPress: () => {
                      navigation.navigate('Profile', {
                        verfiyIdentifyModalOpen: true,
                      });
                    },
                  },
                ],
              );
            }
          }}>
          <ImageBackground
            source={{
              uri:
                'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            style={{
              width: SIZES.width,
              height: 100,
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
                width: SIZES.width,
                height: 100,
              }}
            />
            <View style={{position: 'absolute', bottom: 10, right: 10}}>
              <Text style={[FONTS.body2, {color: COLORS.white}]}>
                {t('community.sharingsocial')}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={[FONTS.h1, {color: COLORS.black, textAlign: 'center'}]}>
          {t('community.socialcommunity')}
        </Text>
      </View>
      <SocialCategoryContainer />
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <Text style={[FONTS.h3, {color: COLORS.black}]}>
          {t('community.socialcomment.activity')}
        </Text>
      </View>
      <SocialActivityContainer />
    </View>
  );
};

export default SocialContainer;

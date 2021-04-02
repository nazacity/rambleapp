import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, SHADOW, SIZES} from '../../constants';
import ImageModal from '../modal/ImageModal';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const Routes = ({activity}) => {
  const {t} = React.useContext(LocalizationContext);

  const RouteCard = ({item, index}) => {
    return (
      <View
        style={[
          {
            width: 300,
            height: 200,
            borderRadius: 5,
            marginBottom: 10,
          },
          SHADOW.image,
        ]}>
        <ImageModal
          style={{
            width: 300,
            height: 200,
            borderRadius: 5,
            backgrounColor: COLORS.white,
            overflow: 'hidden',
          }}
          source={{
            uri: item.route_picture_url,
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
              width: 300,
              height: 200,
              position: 'absolute',
            }}
          />
          <View style={{position: 'absolute', bottom: 20, left: 20}}>
            <Text
              style={[
                FONTS.body3,
                {color: COLORS.white, lineHeight: 18, width: 250},
              ]}>
              {item.title}
            </Text>
          </View>
          <View style={{position: 'absolute', top: 5, right: 5}}>
            <Feather name="zoom-in" size={24} color={COLORS.white} />
          </View>
        </ImageModal>
      </View>
    );
  };

  return (
    <View>
      <TitleHeader title={t('activity.routes')} />
      <View style={{marginLeft: 20}}>
        {activity.routes.map((item, index) => {
          return <RouteCard key={index} item={item} index={index} />;
        })}
      </View>
    </View>
  );
};

export default Routes;

import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import {SIZES} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import {useDispatch} from 'react-redux';
import {useCoupon} from '../../redux/actions/UserAction';
import {setLoading} from '../../redux/actions/AppStateAction';

const CouponCard = ({item, userActivityId, setUserActivity}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: {x: SIZES.width + 100, y: gestureState.dy},
            useNativeDriver: false,
          }).start(() => {
            dispatch(setLoading(true));
            dispatch(useCoupon(userActivityId, item._id, setUserActivity));
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });

  const useCouponOpacity = pan.x.interpolate({
    inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        {
          transform: [
            {translateX: pan.x},
            // {translateY: pan.y},
            {rotate: rotate},
          ],
        },
        {
          height: 200,
          width: 300,
        },
      ]}
      {...panResponder.panHandlers}>
      <Image
        style={{
          flex: 1,
          height: 200,
          width: 300,
          resizeMode: 'cover',
          borderRadius: 10,
        }}
        source={{uri: item.coupon_picture_url}}
      />
      <Animated.View
        style={{
          opacity: useCouponOpacity,
          transform: [{rotate: '-20deg'}],
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
        }}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'green',
            color: 'white',
            fontSize: 32,
            fontWeight: '800',
            padding: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          {t('coupon.use')}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({});

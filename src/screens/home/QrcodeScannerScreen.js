import React, {useRef} from 'react';
import {View, Animated, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  checkinActivity,
  checkoutActivity,
} from '../../redux/actions/UserAction';
import {setLoading} from '../../redux/actions/AppStateAction';
import {useDispatch} from 'react-redux';
import LocalizationContext from '../LocalizationContext';

const QrcodeScannerScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const qrcodeSize = useRef(new Animated.Value(240)).current;
  const {activityId, courseId, userActivityId, state} = route.params;

  const refreshCheckIn = () => {
    navigation.replace('QrcodeScanner', {
      activityId: activityId,
      courseId: courseId,
      state: 'check_in',
      userActivityId: userActivityId,
    });
  };

  const checkinFunction = async (data) => {
    if (activityId === data) {
      dispatch(checkinActivity(navigation, userActivityId, refreshCheckIn));
    } else {
      dispatch(setLoading(false));
      Alert.alert(
        t('qrcodescanner.activityidincorrect'),
        t('qrcodescanner.pleasetryagain'),
        [
          {
            text: t('qrcodescanner.cancel'),
            onPress: () => {
              navigation.goBack();
            },
            style: 'cancel',
          },
          {
            text: t('qrcodescanner.tryagain'),
            onPress: () => {
              refreshCheckIn();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const refreshCheckOut = () => {
    navigation.replace('QrcodeScanner', {
      activityId: activityId,
      courseId: courseId,
      state: 'check_out',
      userActivityId: userActivityId,
    });
  };

  const checkoutFunction = async (data) => {
    console.log(data);
    if (courseId === data) {
      dispatch(checkoutActivity(navigation, userActivityId, refreshCheckOut));
    } else {
      dispatch(setLoading(false));
      Alert.alert(
        t('qrcodescanner.activityidincorrect'),
        t('qrcodescanner.pleasetryagain'),
        [
          {
            text: t('qrcodescanner.cancel'),
            onPress: () => {
              navigation.goBack();
            },
            style: 'cancel',
          },
          {
            text: t('qrcodescanner.tryagain'),
            onPress: () => {
              refreshCheckOut();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const onSuccess = (e) => {
    dispatch(setLoading(true));
    Animated.sequence([
      // after decay, in parallel:
      Animated.spring(qrcodeSize, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.spring(qrcodeSize, {
        toValue: 240,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (state === 'check_in') {
        checkinFunction(e.data);
      } else if (state === 'check_out') {
        checkoutFunction(e.data);
      }
    });
  };

  return (
    <View>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        customMarker={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View style={{height: qrcodeSize, width: qrcodeSize}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderTopWidth: 5,
                    borderLeftWidth: 5,
                    borderColor: '#fff',
                    height: 50,
                    width: 50,
                    borderTopLeftRadius: 20,
                  }}
                />
                <View style={{flex: 1}} />
                <View
                  style={{
                    borderTopWidth: 5,
                    borderRightWidth: 5,
                    borderColor: '#fff',
                    height: 50,
                    width: 50,
                    borderTopRightRadius: 20,
                  }}
                />
              </View>
              <View style={{flex: 1}} />
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderBottomWidth: 5,
                    borderLeftWidth: 5,
                    borderColor: '#fff',
                    height: 50,
                    width: 50,
                    borderBottomLeftRadius: 20,
                  }}
                />
                <View style={{flex: 1}} />
                <View
                  style={{
                    borderBottomWidth: 5,
                    borderRightWidth: 5,
                    borderColor: '#fff',
                    height: 50,
                    width: 50,
                    borderBottomRightRadius: 20,
                  }}
                />
              </View>
            </Animated.View>
          </View>
        }
      />
    </View>
  );
};

export default QrcodeScannerScreen;

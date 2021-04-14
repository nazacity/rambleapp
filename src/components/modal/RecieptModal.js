import React, {useState, Fragment, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import ViewShot from 'react-native-view-shot';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../screens/LocalizationContext';
import dayjs from 'dayjs';
import {get} from '../../redux/actions/request';
import {Snackbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const RecieptModal = ({open, handleClose, userActivity, reciept}) => {
  const {t} = React.useContext(LocalizationContext);
  const [save, setSave] = useState(false);
  const [data, setData] = useState({
    amount: '',
    billPaymentRef1: '',
    billPaymentRef2: '',
    billPaymentRef3: '',
    channelCode: '',
    currencyCode: '',
    equivalentAmount: '',
    equivalentCurrencyCode: '',
    eventCode: '',
    exchangeRate: '',
    fastEasySlipNumber: '',
    partnerTransactionId: '',
    payeeAccountNumber: '',
    payeeName: '',
    payeeProxyId: '',
    payeeProxyType: '',
    payerAccountNumber: '',
    payerName: '',
    payerProxyId: '',
    payerProxyType: '',
    receivingBankCode: '',
    reverseFlag: '',
    sendingBankCode: '',
    tepaCode: '',
    transactionDateandTime: '',
    transactionId: '',
    transactionType: '',
  });
  const viewShotRef = useRef();

  const checkAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const saveToDevice = async () => {
    if (Platform.OS === 'android') {
      await checkAndroidPermission();
    }
    const imageUrl = await viewShotRef.current.capture();

    CameraRoll.save(imageUrl)
      .then((path) => {
        setSave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTransaction = async () => {
    if (reciept._id) {
      try {
        const res = await get(
          `/api/users/requestbillpaymentbyinquiry/${userActivity._id}/${reciept._id}`,
        );
        setData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [reciept]);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={open}
      style={{
        margin: 0,
        justifyContent: 'center',
        zIndex: 1,
      }}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      avoidKeyboard
      onSwipeComplete={handleClose}
      useNativeDriverForBackdrop
      swipeDirection={['down', 'up']}>
      <View
        style={{
          backgroundColor: COLORS.backgroundColor,
          marginHorizontal: 20,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            padding: 10,
          }}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{borderRadius: 15}}
            onPress={saveToDevice}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[FONTS.body4, {color: COLORS.white, marginRight: 10}]}>
              {t('reciept.save')}
            </Text>
            <MaterialIcons name="save-alt" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1}}>
          <View style={{backgroundColor: COLORS.backgroundColor, padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 100,
                  backgroundColor: COLORS.primary,
                  height: 5,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/logo/ramble512.png')}
                  style={{width: 60, height: 60}}
                />
              </View>
              <View
                style={{
                  width: 100,
                  backgroundColor: COLORS.primary,
                  height: 5,
                  borderRadius: 10,
                }}
              />
            </View>
            <View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: COLORS.success,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <Ionicons name="checkmark" color={COLORS.white} size={10} />
                  </View>
                  <Text
                    style={[
                      FONTS.h3,
                      {textAlign: 'center', color: COLORS.success},
                    ]}>
                    {t('reciept.reciept')}
                  </Text>
                </View>
                <Text style={[FONTS.body5, {textAlign: 'center'}]}>
                  {dayjs(reciept.payDate).format('D MMM YY - HH:mm')}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.lightOpcaityBlack,
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[FONTS.h5, {color: COLORS.darkOpacityBlack}]}>
                  REF ID:{' '}
                </Text>
                <Text style={[FONTS.body5, {color: COLORS.darkOpacityBlack}]}>
                  {userActivity._id}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.lightOpcaityBlack,
                  marginVertical: 10,
                }}
              />
              <ImageBackground
                source={{
                  uri: userActivity.activity.id.activity_picture_url,
                }}
                style={{
                  height: 200,
                  resizeMode: 'cover',
                }}>
                <LinearGradient
                  colors={[
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.6)',
                  ]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  useAngle
                  angle={180}
                  style={{
                    flex: 1,
                    left: 0,
                    top: 0,
                    height: 200,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: SIZES.width - 60,
                    padding: 10,
                    height: 200,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text style={[FONTS.h4, {flex: 1, color: COLORS.white}]}>
                      {t('payment.activity')}
                    </Text>
                    <Text style={[FONTS.body2, {color: COLORS.white}]}>
                      {userActivity.activity.id.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text style={[FONTS.h4, {flex: 1, color: COLORS.white}]}>
                      {t('payment.course')}
                    </Text>
                    <Text style={[FONTS.body2, {color: COLORS.white}]}>
                      {userActivity.activity.course.title}
                    </Text>
                  </View>
                  {data.payerName !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <Text style={[FONTS.h4, {flex: 1, color: COLORS.white}]}>
                        {t('reciept.payer')}
                      </Text>
                      <Text style={[FONTS.body2, {color: COLORS.white}]}>
                        {data.payerName}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text style={[FONTS.h4, {flex: 1, color: COLORS.white}]}>
                      {t('reciept.payee')}
                    </Text>
                    <Text style={[FONTS.body2, {color: COLORS.white}]}>
                      บริษัท นาซ่าซิตี้ จำกัด
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.lightOpcaityBlack,
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={[FONTS.h4, {flex: 1, color: COLORS.darkOpacityBlack}]}>
                  {t('activity.amount')} :{' '}
                </Text>
                <Text
                  style={[
                    FONTS.body2,
                    {color: COLORS.darkOpacityBlack, marginRight: 20},
                  ]}>
                  {data.amount ? data.amount : reciept.amount + '.00'}{' '}
                </Text>
                <Text style={[FONTS.h4, {color: COLORS.darkOpacityBlack}]}>
                  {t('activity.bath')}
                </Text>
              </View>
            </View>
          </View>
        </ViewShot>
      </View>

      <Snackbar
        visible={save}
        onDismiss={() => {
          setSave(false);
          handleClose();
        }}
        style={{
          backgroundColor: COLORS.success,
        }}
        duration={1500}>
        {t('reciept.successed')}
      </Snackbar>
    </Modal>
  );
};

export default RecieptModal;

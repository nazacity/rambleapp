import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import {FONTS, COLORS, SHADOW} from '../../constants';
import {post} from '../../redux/actions/request';
import Spinner from 'react-native-loading-spinner-overlay';
import {refresh} from '../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';
import AddressCard from '../../components/card/AddressCard';
import EditAddressModal from '../../components/modal/EditAddressModal';
import EmergencyCard from '../../components/card/EmergencyCard';
import {setLoading} from '../../redux/actions/AppStateAction';

const PaymentScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const {userActivity} = route.params;
  const [image, setImage] = useState('');
  const [loading, setLoading1] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getQrcode = async () => {
    let amount;
    if (userActivity.address._id !== '5ff6600d20ed83388ab4ccbd') {
      amount = +userActivity.activity.course.price + 80;
      const res = await post(`/api/users/requestpayment/${userActivity._id}`, {
        amount: amount,
        activity_title: userActivity.activity.id.title,
        mailfee: true,
      });

      if (res) {
        setImage(res.data.qrImage);
      }
    } else {
      amount = +userActivity.activity.course.price;
      const res = await post(`/api/users/requestpayment/${userActivity._id}`, {
        amount: amount,
        activity_title: userActivity.activity.id.title,
        mailfee: false,
      });

      if (res) {
        setImage(res.data.qrImage);
      }
    }

    setLoading1(false);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        dispatch(refresh());
        navigation.navigate('Home');
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getQrcode();
    return () => backHandler.remove();
  }, []);

  if (loading) {
    return <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}} />;
  }

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[FONTS.h2, {textAlign: 'center', color: COLORS.primary}]}>
          {t('payment.confirm')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={[FONTS.h3]}>REF ID: </Text>
          <Text style={[FONTS.body3]}>{userActivity._id}</Text>
        </View>
        <View>
          <TitleHeader title={t('payment.userinfo')} noDot={true} />
          <Text style={[FONTS.body3, {marginBottom: 10}]}>
            {t('signup.first_name')} {user.first_name} {t('signup.last_name')}{' '}
            {user.last_name}
          </Text>
          <Text style={[FONTS.body3, {marginBottom: 10}]}>
            {t('signup.gender')}{' '}
            {user.gender === 'male' && (
              <Text style={[FONTS.body3]}>{t('createpost.male')}</Text>
            )}
            {user.gender === 'female' && (
              <Text style={[FONTS.body3]}>{t('createpost.female')}</Text>
            )}
          </Text>
          <Text style={[FONTS.body3, {marginBottom: 10}]}>
            {t('payment.age')} {user.age}
          </Text>
        </View>
        <View>
          <TitleHeader title={t('payment.activity')} noDot={true} />
          <View
            style={[
              SHADOW.image,
              {
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 10,
              },
            ]}>
            <Image
              source={{uri: userActivity.activity.id.activity_picture_url}}
              style={{width: 300, height: 200, borderRadius: 10}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TitleHeader title={t('payment.course')} noDot={true} />
            <Text style={[FONTS.body4, {marginBottom: 10}]}>
              {userActivity.activity.course.title}
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <TitleHeader title={t('payment.size')} noDot={true} />
            <Text style={[FONTS.body4, {marginBottom: 10}]}>
              {userActivity.size.size.toUpperCase()}
            </Text>
          </View>
        </View>
        <View>
          <TitleHeader title={t('payment.address')} noDot={true} />
          <Text style={[FONTS.body4, {marginLeft: 10}]}>
            {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd' &&
              t('payment.postzip')}
            {userActivity.address._id === '5ff6600d20ed83388ab4ccbd' &&
              t('activity.atevent')}
          </Text>
          {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd' && (
            <View style={{padding: 5}}>
              <AddressCard
                item={
                  userActivity.address._id === '5ff6600d20ed83388ab4ccbd'
                    ? {
                        _id: '5ff6600d20ed83388ab4ccbd',
                        address: t('activity.atevent'),
                      }
                    : userActivity.address
                }
                editable={false}
              />
            </View>
          )}
        </View>
        <View>
          <TitleHeader title={t('payment.emergency')} noDot={true} />
          <View style={{padding: 5}}>
            <EmergencyCard
              item={userActivity.emergency_contact}
              editable={false}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TitleHeader title={t('payment.fee')} noDot={true} />
            <Text style={[FONTS.body4, {marginBottom: 10}]}>
              {userActivity.activity.course.price} {t('payment.baht')}
            </Text>
          </View>
          {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd' && (
            <View style={{flex: 0.5}}>
              <TitleHeader title={t('payment.emsfee')} noDot={true} />
              <Text style={[FONTS.body4, {marginBottom: 10}]}>
                80 {t('payment.baht')}
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 1}}>
          <TitleHeader title={t('payment.total')} noDot={true} />
          <Text style={[FONTS.h2, {marginLeft: 20, marginBottom: 10}]}>
            {userActivity.address._id !== '5ff6600d20ed83388ab4ccbd'
              ? userActivity.activity.course.price + 80
              : userActivity.activity.course.price}{' '}
            {t('payment.baht')}
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={[FONTS.body3, {textAlign: 'center'}]}>
            {t('payment.warning1')}
          </Text>
        </View>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: `data:image/jpg;base64,${image}`}}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <Text style={[FONTS.h3]}>REF ID: </Text>
          <Text style={[FONTS.body4]}>{userActivity._id}</Text>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={[FONTS.body3, {textAlign: 'center'}]}>
            {t('payment.warning2')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Linking.openURL(`http://line.me/ti/p/~@833qbcov`);
            }}>
            <Text
              style={[
                FONTS.body3,
                {textAlign: 'center', color: COLORS.buttonBlue},
              ]}>
              {t('payment.warning3')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('payment.back')}
            color={COLORS.pinkPastel}
            onPress={() => {
              dispatch(refresh());
              navigation.navigate('Home');
            }}
          />
        </View>
        <View style={{marginBottom: 50}} />
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;

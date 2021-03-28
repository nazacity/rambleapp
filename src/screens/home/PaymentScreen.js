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
import {FONTS, COLORS} from '../../constants';
import {post} from '../../redux/actions/request';
import Spinner from 'react-native-loading-spinner-overlay';
import {refresh} from '../../redux/actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';
import AddressCard from '../../components/card/AddressCard';
import EditAddressModal from '../../components/modal/EditAddressModal';

const PaymentScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const {activity_title, userActivity} = route.params;
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getQrcode = async () => {
    let amount;
    if (userActivity.address._id !== '5ff6600d20ed83388ab4ccbd') {
      amount = +userActivity.activity.course.price + 80;
      const res = await post(`/api/users/requestpayment/${userActivity._id}`, {
        amount: amount,
        activity_title: activity_title,
        mailfee: true,
      });

      if (res) {
        setImage(res.data.qrImage);
      }
    } else {
      amount = +userActivity.activity.course.price;
      const res = await post(`/api/users/requestpayment/${userActivity._id}`, {
        amount: amount,
        activity_title: activity_title,
        mailfee: false,
      });

      if (res) {
        setImage(res.data.qrImage);
      }
    }

    setLoading(false);
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

  const [address, setAddress] = useState({
    _id: '',
    address: '',
    zip: '',
    phone_number: '',
    province: '',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  if (loading) {
    return (
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
        color={COLORS.pinkPastel}
      />
    );
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
        <View>
          <TitleHeader title={t('payment.userinfo')} />
          <Text style={[FONTS.body3, {marginBottom: 10}]}>
            ชื่อ {user.first_name} {user.last_name}
          </Text>
          <Text style={[FONTS.body3, {marginBottom: 10}]}>
            เพศ {user.gender}
          </Text>
        </View>
        <View>
          <TitleHeader title={t('payment.userinfo')} />
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
              editable={
                userActivity.address._id === '5ff6600d20ed83388ab4ccbd'
                  ? false
                  : true
              }
              // deletable={true}
              setAddress={setAddress}
              setEditModalOpen={setEditModalOpen}
            />
          </View>
        </View>
        <View>
          <TitleHeader title={t('payment.activity')} />
          <Text style={[FONTS.body4, {marginBottom: 10}]}>
            {activity_title}
          </Text>
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
          <Text
            style={[
              FONTS.h2,
              {marginLeft: 20, marginBottom: 10, textAlign: 'center'},
            ]}>
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
      <EditAddressModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        address={address}
      />
    </View>
  );
};

export default PaymentScreen;

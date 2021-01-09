import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import Button from '../../components/Button';
import {FONTS, COLORS, SIZES} from '../../constants';
import {post} from '../../redux/actions/request';
import Spinner from 'react-native-loading-spinner-overlay';
import {refresh} from '../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';

const PaymentScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const {course, size, activity_title, userActivityId, address} = route.params;
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getQrcode = async () => {
    let amount;
    if (address !== '5ff6600d20ed83388ab4ccbd') {
      amount = +course.price + 80;
    } else {
      amount = +course.price;
    }
    const res = await post(`/api/users/requestpayment/${userActivityId}`, {
      amount: amount,
      activity_title: activity_title,
    });

    if (res) {
      setImage(res.data.qrImage);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Text style={[FONTS.h2, {textAlign: 'center', color: COLORS.primary}]}>
        {t('payment.confirm')}
      </Text>
      <View>
        <TitleHeader title={t('payment.activity')} />
        <Text style={[FONTS.body4, {marginBottom: 10}]}>{activity_title}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TitleHeader title={t('payment.course')} noDot={true} />
          <Text style={[FONTS.body4, {marginBottom: 10}]}>{course.title}</Text>
        </View>
        <View style={{flex: 0.5}}>
          <TitleHeader title={t('payment.size')} noDot={true} />
          <Text style={[FONTS.body4, {marginBottom: 10}]}>
            {size.size.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TitleHeader title={t('payment.fee')} noDot={true} />
          <Text style={[FONTS.body4, {marginBottom: 10}]}>
            {course.price} {t('payment.baht')}
          </Text>
        </View>
        {address !== '5ff6600d20ed83388ab4ccbd' && (
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
          {address !== '5ff6600d20ed83388ab4ccbd'
            ? course.price + 80
            : course.price}{' '}
          {t('payment.baht')}
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
          {t('payment.warning1')}
        </Text>
        <Text style={[FONTS.body3, {textAlign: 'center'}]}>
          {t('payment.warning2')}
        </Text>
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
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});

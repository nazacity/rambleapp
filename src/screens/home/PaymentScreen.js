import React, {useEffect} from 'react';
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
import ImageModal from 'react-native-image-modal';

const PaymentScreen = ({navigation, route}) => {
  const {course, size, activity_title} = route.params;

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.navigate('Home');
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
      <Text style={[FONTS.h2, {textAlign: 'center'}]}>ยืนยันการลงทะเบียน</Text>
      <View>
        <Text style={[FONTS.h3, {marginBottom: 10}]}>กิจกรรม</Text>
        <Text style={[FONTS.body4, {marginLeft: 20, marginBottom: 10}]}>
          {activity_title}
        </Text>
      </View>
      <View>
        <Text style={[FONTS.h3, {marginBottom: 10}]}>คอร์สวิ่ง</Text>
        <Text style={[FONTS.body4, {marginLeft: 20, marginBottom: 10}]}>
          {course.title}
        </Text>
      </View>
      {/* <View>
        <Text style={[FONTS.h3, {marginBottom: 10}]}>แบบเสื้อ</Text>

        <ImageModal
          resizeMode="contain"
          imageBackgroundColor={COLORS.background}
          overlayBackgroundColor="rgba(0,0,0,0.3)"
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            marginLeft: 20,
          }}
          source={{uri: shirt.shirt_picturl_url}}
        />
      </View> */}
      <View style={{marginTop: 10}}>
        <Text style={[FONTS.h3, {marginBottom: 10}]}>ไซส์เสื้อ</Text>
        <Text style={[FONTS.body4, {marginLeft: 20, marginBottom: 10}]}>
          {size.size.toUpperCase()}
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={[FONTS.h3, {marginBottom: 10}]}>ค่าสมัคร</Text>
        <Text style={[FONTS.body4, {marginLeft: 20, marginBottom: 10}]}>
          {course.price} บาท
        </Text>
      </View>
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        <Image
          source={require('../../../assets/qrcode/qrcode.png')}
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={[FONTS.body3, {textAlign: 'center'}]}>
          กรุณาชำระเงิน ผ่านการสแกน Qrcode เท่านั้น
        </Text>
        <Text style={[FONTS.body3, {textAlign: 'center'}]}>
          หากชำระแล้ว ระบบจะอัพเดทอัตโนมัติ
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          label="ชำระแล้ว"
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.replace('Home');
          }}
        />
      </View>
      <View style={{marginBottom: 50}} />
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImageModal from 'react-native-image-modal';
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

import Button from '../../components/Button';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {CheckBox} from 'react-native-elements';
import TermsAndConditionsModal from '../../components/modal/TermsAndConditionsModal';
import AddressCard from '../../components/card/AddressCard';
import EmergencyCard from '../../components/card/EmergencyCard';
import {registerActivity} from '../../redux/actions/UserAction';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';

const ActivityRegisterScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const {activity} = route.params;
  const [course, setCourse] = useState(activity.courses[0]);
  const [address, setAddress] = useState(user.addresses[0]);
  const [emergency, setEmergency] = useState(user.emergency_contacts[0]);
  const [size, setSize] = useState(activity.size[0]);
  const [acceptTerm, setAcceptTerm] = useState(false);
  const [termModalOpen, setTermModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTermModalClose = () => {
    setTermModalOpen(false);
  };

  // FOCUSES
  const [focus, setFocus] = useState({});

  const navigateUser = (userActivityId) => {
    navigation.replace('Payment', {
      course: course,
      size: size,
      address: address,
      activity_title: activity.title,
      userActivityId: userActivityId,
    });
  };

  const onSubmit = () => {
    dispatch(
      registerActivity(
        {
          activity: {
            id: activity._id,
            course: {
              _id: course._id,
              title: course.title,
              range: course.range,
              price: course.price,
              course_picture_url: course.course_picture_url,
            },
          },
          address: address._id,
          emergency_contact: emergency._id,
          size: {
            id: size.id,
            size: size.size,
            description: size.description,
          },
        },
        navigateUser,
      ),
    );
  };

  return (
    <ScrollView
      style={{backgroundColor: COLORS.backgroundColor, padding: 20, flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: 300,
          height: 200,
          borderRadius: 10,
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        <ImageModal
          resizeMode="contain"
          imageBackgroundColor={COLORS.background}
          overlayBackgroundColor="rgba(0,0,0,0.3)"
          style={{
            width: 300,
            height: 200,
            borderRadius: 10,
          }}
          source={{uri: activity.activity_picture_url}}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <TitleHeader title={t('activity.course')} />
        <View>
          {activity.courses.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <CheckBox
                    title={`${item.title} ค่าสมัคร ${item.price} บาท`}
                    checked={course._id === item._id ? true : false}
                    onPress={() => setCourse(item)}
                    containerStyle={{borderWidth: 0}}
                    checkedColor={COLORS.pinkPastel}
                    textStyle={[FONTS.h3]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{marginBottom: 20}}>
        <TitleHeader title={t('activity.size')} />
        <View style={{paddingTop: 20}}>
          {activity.size.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <CheckBox
                    title={`${item.size.toUpperCase()} ${item.description}`}
                    checked={size._id === item._id ? true : false}
                    onPress={() => setSize(item)}
                    containerStyle={{borderWidth: 0}}
                    checkedColor={COLORS.pinkPastel}
                    textStyle={[FONTS.h3, {color: COLORS.pinkText}]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{marginBottom: 20}}>
        <TitleHeader title={t('activity.address')} />
        <View style={{paddingTop: 20}}>
          {user.addresses.length > 0 ? (
            user.addresses.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    SHADOW.default,
                    {
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      borderWidth: item._id === address._id ? 2 : 0,
                      marginVertical: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setAddress(item);
                    }}>
                    <AddressCard item={item} deletable={false} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('home', {screen: 'Address'});
              }}>
              <Text style={[FONTS.h5, {textAlign: 'center'}]}>
                {t('activity.addaddress')}
              </Text>
              <Text style={[FONTS.h5, {textAlign: 'center'}]}>
                {t('activity.clickhere')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{marginBottom: 20}}>
        <TitleHeader title={t('activity.emergency')} />
        <View style={{paddingTop: 20}}>
          {user.emergency_contacts.length > 0 ? (
            user.emergency_contacts.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    SHADOW.default,
                    {
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      borderWidth: item._id === emergency._id ? 2 : 0,
                      marginVertical: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setEmergency(item);
                    }}>
                    <EmergencyCard item={item} deletable={false} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('home', {screen: 'EmergencyContact'});
              }}>
              <Text style={[FONTS.h5, {textAlign: 'center'}]}>
                {t('activity.addemergency')}
              </Text>
              <Text style={[FONTS.h5, {textAlign: 'center'}]}>
                {t('activity.clickhere')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        style={{margin: 20}}
        onPress={() => setTermModalOpen(!termModalOpen)}>
        <Text style={{textAlign: 'center'}}>
          {t('activity.conditionandterms')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setAcceptTerm(!acceptTerm)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <View>
          <CheckBox
            checked={acceptTerm}
            onPress={() => setAcceptTerm(!acceptTerm)}
            containerStyle={{borderWidth: 0, padding: 0, margin: 0}}
            checkedColor={COLORS.pinkPastel}
            textStyle={[FONTS.h3, {color: COLORS.pinkText}]}
          />
        </View>
        <Text style={{textAlign: 'center'}}>{t('activity.accepted')}</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Button
          label="ลงทะเบียน"
          color={COLORS.pinkPastel}
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
      <View style={{marginBottom: 50}}></View>
      <TermsAndConditionsModal
        open={termModalOpen}
        handleClose={handleTermModalClose}
        data={activity.condition}
        setAcceptTerm={setAcceptTerm}
      />
    </ScrollView>
  );
};

export default ActivityRegisterScreen;

const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import {activity} from '../../config/data';
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

const ActivityRegisterScreen = ({navigation, route}) => {
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
      style={{backgroundColor: COLORS.background, padding: 20, flex: 1}}
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
        <Text style={[FONTS.h2]}>คอร์สวิ่ง</Text>
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
        <Text style={[FONTS.h2]}>ไซต์</Text>
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
        <Text style={[FONTS.h2]}>เลือกที่อยู่จัดส่ง</Text>
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
            <Text>กรุณาเพิ่มที่อยู่</Text>
          )}
        </View>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={[FONTS.h2]}>เลือกการติดต่อฉุกเฉิน</Text>
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
            <Text>กรุณาการติดต่อฉุกเฉิน</Text>
          )}
        </View>
      </View>

      <View
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
        <TouchableOpacity
          activeOpacity={0.6}
          style={{width: 200}}
          onPress={() => setTermModalOpen(!termModalOpen)}>
          <Text style={{textAlign: 'center'}}>
            ฉันได้อ่าน และยอมรับข้อตกลง และเงื่อนไขการลงแข่งขัน
          </Text>
        </TouchableOpacity>
      </View>
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

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImageModal from 'react-native-image-modal';

import Button from '../../components/Button';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {CheckBox} from 'react-native-elements';
import TermsAndConditionsModal from '../../components/modal/TermsAndConditionsModal';
import AddressCard from '../../components/card/AddressCard';
import EmergencyCard from '../../components/card/EmergencyCard';
import {registerActivity} from '../../redux/actions/UserAction';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';
import {setSnackbarDisplay} from '../../redux/actions/AppStateAction';

const ActivityRegisterScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);

  const {activity} = route.params;
  const [course, setCourse] = useState(
    route.params.course ? route.params.course : activity.courses[0],
  );
  const [address, setAddress] = useState(
    user.addresses[0] ? user.addresses[0] : {_id: ''},
  );
  const [emergency, setEmergency] = useState(
    user.emergency_contacts[0] ? user.emergency_contacts[0] : {_id: ''},
  );
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
    if (!acceptTerm) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.pleaseacceptterm'),
        }),
      );
      return;
    } else {
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
            announcement: activity.announcement,
          },
          navigateUser,
          t,
        ),
      );
    }
  };

  useEffect(() => {
    if (user.addresses.length === 0) {
      Alert.alert(t('activity.noaddresses'), t('activity.pleaseaddaddresses'), [
        {
          text: t('activity.okay'),
          onPress: () => {
            navigation.navigate('Address');
          },
        },
      ]);
    } else if (user.emergency_contacts.length === 0) {
      Alert.alert(t('activity.noemergency'), t('activity.pleaseaddemergency'), [
        {
          text: t('activity.okay'),
          onPress: () => {
            navigation.navigate('EmergencyContact');
          },
        },
      ]);
    }
  }, []);

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
                    containerStyle={{
                      borderWidth: 0,
                      backgroundColor: COLORS.backgroundColor,
                    }}
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
                    containerStyle={{
                      borderWidth: 0,
                      backgroundColor: COLORS.backgroundColor,
                    }}
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
        <View>
          {user.addresses.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={[
                  {
                    _id: '5ff6600d20ed83388ab4ccbd',
                    address: t('activity.atevent'),
                  },
                  ...user.addresses,
                ]}
                keyExtractor={(item) => `${item._id}`}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        {
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          borderWidth: item._id === address._id ? 1 : 0,
                          borderColor: COLORS.primary,
                          width: SIZES.width - 80,
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setAddress(item);
                        }}>
                        <AddressCard item={item} deletable={false} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={{margin: 10}} />}
                contentContainerStyle={{paddingHorizontal: 20}}
                ListFooterComponent={() => <View style={{margin: 5}} />}
                ListHeaderComponent={() => <View style={{margin: 5}} />}
              />
            </ScrollView>
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
        <View>
          {user.emergency_contacts.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={user.emergency_contacts}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={[
                        SHADOW.default,
                        {
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          borderWidth: item._id === emergency._id ? 1 : 0,
                          borderColor: COLORS.primary,
                          width: SIZES.width - 80,
                        },
                      ]}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setEmergency(item);
                        }}>
                        <EmergencyCard item={item} deletable={false} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={{margin: 10}} />}
                contentContainerStyle={{paddingHorizontal: 20}}
                ListFooterComponent={() => <View style={{margin: 5}} />}
                ListHeaderComponent={() => <View style={{margin: 5}} />}
              />
            </ScrollView>
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
        <Text style={[FONTS.h5, {textAlign: 'center', color: COLORS.link}]}>
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
          label={t('activity.register')}
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

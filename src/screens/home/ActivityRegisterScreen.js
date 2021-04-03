import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImageModal from 'react-native-image-modal';

import Button from '../../components/Button';
import {FONTS, COLORS, SIZES, SHADOW} from '../../constants';
import {CheckBox} from 'react-native-elements';
import TermsAndConditionsModal from '../../components/modal/TermsAndConditionsModal';
import AddressCard from '../../components/card/AddressCard';
import EmergencyCard from '../../components/card/EmergencyCard';
import {
  editUserProfile,
  registerActivity,
} from '../../redux/actions/UserAction';
import LocalizationContext from '../LocalizationContext';
import TitleHeader from '../../components/layout/TitleHeader';
import {
  setAddAddressModal,
  setEmergencyModal,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import BackButton from '../../components/layout/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddAddressModal from '../../components/modal/AddAddressModal';
import AddEmergencyContactModal from '../../components/modal/AddEmergencyContactModal';
import EditAddressModal from '../../components/modal/EditAddressModal';
import EditEmergencyContactModal from '../../components/modal/EditEmergencyContactModal';
import {ActivityIndicator} from 'react-native';
import FloatingLabelInput from '../../components/floatinglabelinput/FloatingLabelInput';
import {get} from '../../redux/actions/request';
import {Alert} from 'react-native';

const ActivityRegisterScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.appState.isLoading);

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
  const [value, setValue] = useState({
    idcard: '',
    phone_number: '',
  });
  const [checkIdLoading, setCheckIdLoading] = useState(false);
  const [message, setMessage] = useState({
    msg: '',
    state: 'success',
  });
  const dispatch = useDispatch();

  const handleTermModalClose = () => {
    setTermModalOpen(false);
  };

  const navigateUser = (userActivity) => {
    navigation.replace('Payment', {
      address: address,
      activity_title: activity.title,
      userActivity: userActivity,
    });
  };

  const onSubmit = () => {
    if (user.idcard === 'not provided yet') {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.pleaseprovideidcard'),
        }),
      );
      return;
    } else if (user.phone_number === 'not provided yet') {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.pleaseprovidephonenumber'),
        }),
      );
      return;
    } else if (!address._id) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.selectaddress'),
        }),
      );
      return;
    } else if (!emergency._id) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.selectemergency'),
        }),
      );
      return;
    } else if (!course._id) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.selectcourse'),
        }),
      );
      return;
    } else if (!size.id) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('activity.selectsize'),
        }),
      );
      return;
    } else if (!acceptTerm) {
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

  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const [editModalOpen1, setEditModalOpen1] = useState(false);
  const handleEditModalClose1 = () => {
    setEditModalOpen1(false);
  };

  const updateIdcard = async () => {
    if (value.idcard.length < 10) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.phoneerror'),
        }),
      );
    } else {
      dispatch(
        editUserProfile(
          {
            type: 'idcard',
            idcard: value.idcard,
          },
          `${t('signup.idcard')} ${t('editprofile.sucessed')}`,
        ),
      );
    }
  };

  const updatePhoneNumber = async (data) => {
    if (value.phone_number.length < 10) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signup.phoneerror'),
        }),
      );
    } else {
      dispatch(
        editUserProfile(
          {
            type: 'phone_number',
            phone_number: value.phone_number,
          },
          `${t('signup.phone_number')} ${t('editprofile.sucessed')}`,
        ),
      );
    }
  };

  return (
    <View style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            width: SIZES.width,
            height: (SIZES.width * 2) / 3,
            resizeMode: 'cover',
          }}
          source={{uri: activity.activity_picture_url}}
        />
        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          {user.idcard === 'not provided yet' ||
          user.phone_number === 'not provided yet' ? (
            <TitleHeader title={t('activity.neededfirsttime')} />
          ) : null}
          {user.idcard === 'not provided yet' && (
            <Fragment>
              <FloatingLabelInput
                floatingLabel={t('editprofile.idcardorpassport')}
                inputContainerStyle={{borderBottomWidth: 0, width: 300}}
                onChangeText={(text) => {
                  setValue({...value, idcard: text});
                }}
                value={value.idcard}
                keyboardType="number-pad"
              />
              <View style={{alignItems: 'flex-end'}}>
                <Button
                  label={t('activity.save')}
                  width={100}
                  color={COLORS.pinkPastel}
                  onPress={updateIdcard}
                />
              </View>
            </Fragment>
          )}

          {user.phone_number === 'not provided yet' && (
            <Fragment>
              <FloatingLabelInput
                floatingLabel={t('editprofile.phone_number')}
                inputContainerStyle={{borderBottomWidth: 0, width: 300}}
                onChangeText={(text) => {
                  setValue({...value, phone_number: text});
                }}
                value={value.phone_number}
                keyboardType="number-pad"
              />
              <View style={{alignItems: 'flex-end'}}>
                <Button
                  label={t('activity.save')}
                  width={100}
                  color={
                    value.phone_number.length !== 10
                      ? COLORS.inactiveColor
                      : COLORS.pinkPastel
                  }
                  disabled={value.phone_number.length !== 10 ? true : false}
                  onPress={updatePhoneNumber}
                />
              </View>
            </Fragment>
          )}

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
                      checkedColor={COLORS.primary}
                      textStyle={[FONTS.h3, {color: COLORS.opcaityBlack}]}
                      size={18}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          <TitleHeader title={t('activity.size')} />
          <View>
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
                      checkedColor={COLORS.primary}
                      textStyle={[FONTS.h3, {color: COLORS.opcaityBlack}]}
                      size={18}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TitleHeader title={t('activity.address')} />
            {user.addresses.length < 3 && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginLeft: 5}}
                onPress={() => {
                  dispatch(setAddAddressModal(true));
                }}>
                <Ionicons
                  name="add"
                  size={20}
                  backgroundColor="transparent"
                  color={COLORS.buttonBlue}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            {[
              {
                _id: '5ff6600d20ed83388ab4ccbd',
                address: t('activity.atevent'),
              },
              ...user.addresses,
            ].map((item, index) => {
              return (
                <View
                  key={item._id}
                  style={[
                    SHADOW.default,
                    {
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                      width: SIZES.width - 80,
                      marginHorizontal: 20,
                      marginVertical: 10,
                      // borderWidth: item._id === address._id ? 1 : 0,
                      // borderColor: COLORS.primary,
                      paddingBottom: 1,
                      backgroundColor:
                        item._id === address._id
                          ? COLORS.primary
                          : COLORS.white,
                    },
                  ]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: 10,
                    }}
                    activeOpacity={0.9}
                    onPress={() => {
                      setAddress(item);
                    }}>
                    <AddressCard
                      item={item}
                      editable={index === 0 ? false : true}
                      setAddress={setAddress}
                      setEditModalOpen={setEditModalOpen}
                      backgroundColor={
                        item._id === address._id ? COLORS.primary : COLORS.white
                      }
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TitleHeader title={t('activity.emergency')} />
            {user.emergency_contacts.length < 3 && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{marginLeft: 5}}
                onPress={() => {
                  dispatch(setEmergencyModal(true));
                }}>
                <Ionicons
                  name="add"
                  size={20}
                  backgroundColor="transparent"
                  color={COLORS.buttonBlue}
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            {user.emergency_contacts.length > 0 ? (
              user.emergency_contacts.map((item, index) => {
                return (
                  <View
                    key={item._id}
                    style={[
                      SHADOW.default,
                      {
                        backgroundColor: COLORS.white,
                        borderRadius: 10,
                        width: SIZES.width - 80,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        // borderWidth: item._id === emergency._id ? 1 : 0,
                        // borderColor: COLORS.primary,
                        paddingBottom: 1,
                        backgroundColor:
                          item._id === emergency._id
                            ? COLORS.primary
                            : COLORS.white,
                      },
                    ]}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                      }}
                      activeOpacity={0.9}
                      onPress={() => {
                        setEmergency(item);
                      }}>
                      <EmergencyCard
                        item={item}
                        editable={true}
                        setEmergency={setEmergency}
                        setEditModalOpen={setEditModalOpen1}
                        backgroundColor={
                          item._id === emergency._id
                            ? COLORS.primary
                            : COLORS.white
                        }
                      />
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(setEmergencyModal(true));
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
          <Text style={[FONTS.h5, {textAlign: 'center'}]}>
            {t('activity.accepted')}
          </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Button
            label={t('activity.register')}
            color={isLoading ? COLORS.inactiveColor : COLORS.pinkPastel}
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
      <AddAddressModal />
      <EditAddressModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        address={address}
      />
      <AddEmergencyContactModal />
      <EditEmergencyContactModal
        open={editModalOpen1}
        handleClose={handleEditModalClose1}
        emergency={emergency}
      />
    </View>
  );
};

export default ActivityRegisterScreen;

const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {View} from 'react-native';
import Button from '../Button';
import {COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import NewUserRegisterModal from '../modal/NewUserRegisterModal';
import {setLoading} from '../../redux/actions/AppStateAction';

const ButtonSection = ({userActivity, activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleNewUserRegisterModalClose = () => {
    setOpen(false);
  };

  return (
    <View style={{alignItems: 'center'}}>
      {userActivity.state === 'unregister' && activity.state === 'registering' && (
        <Button
          width={100}
          height={40}
          label={t('activity.apply')}
          color={COLORS.pinkPastel}
          onPress={() => {
            if (
              user.first_name === 'No name' ||
              user.last_name === 'No name' ||
              !user.gender ||
              !user.birthday ||
              !user.blood_type
            ) {
              setOpen(true);
            } else {
              navigation.navigate('ActivityRegister', {activity: activity});
            }
          }}
        />
      )}
      {userActivity.state === 'waiting_payment' &&
        activity.state === 'registering' && (
          <Button
            width={100}
            height={40}
            label={t('activity.pay')}
            color={COLORS.pinkPastel}
            onPress={() => {
              dispatch(setLoading(true));
              navigation.navigate('Payment', {
                userActivity: userActivity,
              });
            }}
          />
        )}
      {/* {userActivity.state === 'upcoming' && !userActivity.user_post && (
        <Button
          label={t('activity.findfriend')}
          color={COLORS.pinkPastel}
          onPress={() => {
            if (user.vefiry_information.state === 'verified') {
              navigation.navigate('CreatePost', {
                activity: {
                  _id: activity._id,
                  title: activity.title,
                  activity_picture_url: activity.activity_picture_url,
                },
                userActivityId: userActivity._id,
              });
            } else {
              Alert.alert(
                t('activity.noverified'),
                t('activity.pleaseverify'),
                [
                  {
                    text: t('community.comment.okay'),
                    onPress: () => {
                      navigation.navigate('Profile', {
                        verfiyIdentifyModalOpen: true,
                      });
                    },
                  },
                ],
              );
            }
          }}
        />
      )} */}
      {/* {userActivity.state === 'actual_date' && (
        <Button
          width={100}
          height={40}
          label={t('activity.checkin')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.navigate('QrcodeScanner', {
              activityId: activity._id,
              userActivityId: userActivity._id,
              state: 'check_in',
            });
          }}
        />
      )}
      {userActivity.state === 'checked_in' && (
        <Button
          width={100}
          height={40}
          label={t('activity.checkout')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.navigate('QrcodeScanner', {
              courseId: userActivity.activity.course._id,
              userActivityId: userActivity._id,
              state: 'check_out',
            });
          }}
        />
      )} */}
      <NewUserRegisterModal
        open={open}
        handleClose={handleNewUserRegisterModalClose}
      />
    </View>
  );
};

export default ButtonSection;

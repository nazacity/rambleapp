import React from 'react';
import {View, Text} from 'react-native';
import Button from '../Button';
import {COLORS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import {useNavigation} from '@react-navigation/native';

const ButtonSection = ({userActivity, activity}) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View style={{alignItems: 'center'}}>
      {userActivity.state === 'unregister' && activity.state === 'registering' && (
        <Button
          width={200}
          label={t('activity.apply')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.navigate('ActivityRegister', {activity: activity});
          }}
        />
      )}
      {userActivity.state === 'waiting_payment' && (
        <Button
          width={200}
          label={t('activity.payment')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.navigate('Payment', {
              activity_title: activity.title,
              activity_picture_url: activity.activity_picture_url,
              course: userActivity.activity.course,
              size: userActivity.size,
              userActivityId: userActivity._id,
              address: userActivity.address,
            });
          }}
        />
      )}
      {/* {userActivity.state === 'upcoming' && !userActivity.user_post && (
        <Button
          label={t('activity.findfriend')}
          color={COLORS.pinkPastel}
          onPress={() => {
            navigation.navigate('CreatePost', {
              activity: {
                _id: activity._id,
                title: activity.title,
                activity_picture_url: activity.activity_picture_url,
              },
              userActivityId: userActivity._id,
            });
          }}
        />
      )} */}
      {userActivity.state === 'actual_date' && (
        <Button
          width={200}
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
          width={200}
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
      )}
    </View>
  );
};

export default ButtonSection;

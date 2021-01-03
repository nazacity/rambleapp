import React, {Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AddEmergencyContactModal from '../../components/modal/AddEmergencyContactModal';
import {useSelector} from 'react-redux';
import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
import {deleteEmergencyContact} from '../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocalizationContext from '../../screens/LocalizationContext';

const EmergencyCard = ({deletable, item}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 20,
        },
        SHADOW.default,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {t('emergencycontact.name')}
            </Text>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {t('emergencycontact.relationship')}
            </Text>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {item.relationship}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {t('emergencycontact.phone')}
            </Text>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {item.phone_number}
            </Text>
          </View>
        </View>
        {deletable && (
          <TouchableOpacity
            style={{marginRight: 15}}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                t('address.confirmremove'),
                t('address.confirmremovedetail'),
                [
                  {
                    text: t('address.confirm'),
                    onPress: () => dispatch(deleteEmergencyContact(item._id)),
                  },
                  {
                    text: t('address.cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
              );
            }}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="grey"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EmergencyCard;

const styles = StyleSheet.create({});

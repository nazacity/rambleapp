import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteAddress} from '../../redux/actions/UserAction';
import LocalizationContext from '../../screens/LocalizationContext';
import {useDispatch} from 'react-redux';

const AddressCard = ({deletable, item, shadow}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();

  return (
    <View
      style={[
        {
          marginVertical: 10,
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
              {item.address}
            </Text>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {item.province}
            </Text>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>{item.zip}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[FONTS.h4, {marginHorizontal: 5}]}>
              {t('address.phone')}
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
                    onPress: () => dispatch(deleteAddress(item._id)),
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

export default AddressCard;

const styles = StyleSheet.create({});

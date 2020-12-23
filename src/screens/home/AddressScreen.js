import React, {Fragment} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import AddAddressModal from '../../components/modal/AddAddressModal';
import {useSelector} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import AddressCard from '../../components/card/AddressCard';
import {SHADOW} from '../../constants';

const AddressScreen = () => {
  const addresses = useSelector((state) => state.user.addresses);
  const {t} = React.useContext(LocalizationContext);

  return (
    <Fragment>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {addresses.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                SHADOW.default,
                {
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginVertical: 10,
                },
              ]}>
              <AddressCard deletable={true} item={item} />
            </View>
          );
        })}
      </ScrollView>
      <AddAddressModal />
    </Fragment>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});

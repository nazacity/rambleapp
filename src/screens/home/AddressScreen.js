import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AddAddressModal from '../../components/modal/AddAddressModal';
import {useSelector, useDispatch} from 'react-redux';
import LocalizationContext from '../LocalizationContext';
import AddressCard from '../../components/card/AddressCard';
import MenuButton from '../../components/layout/MenuButton';
import {COLORS, SHADOW, FONTS} from '../../constants';
import {setAddAddressModal} from '../../redux/actions/AppStateAction';
import AddButton from '../../components/layout/AddButton';

const AddressScreen = () => {
  const addresses = useSelector((state) => state.user.addresses);
  const dispatch = useDispatch();
  const {t} = React.useContext(LocalizationContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <MenuButton />
      <AddButton
        onPress={() => {
          dispatch(setAddAddressModal(true));
        }}
      />
      {addresses.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('address.noaddress')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={addresses}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({item, index}) => {
            return <AddressCard item={item} deletable={true} index={index} />;
          }}
          // ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{paddingTop: 60}}
        />
      )}
      <AddAddressModal />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import AddAddressModal from '../../components/modal/AddAddressModal';
import EditAddressModal from '../../components/modal/EditAddressModal';
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
  const [address, setAddress] = useState({
    _id: '',
    address: '',
    zip: '',
    phone_number: '',
    province: '',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <MenuButton />
      {addresses.length < 3 && (
        <AddButton
          onPress={() => {
            dispatch(setAddAddressModal(true));
          }}
        />
      )}
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
            return (
              <AddressCard
                item={item}
                // editable={true}
                deletable={true}
                index={index}
                setAddress={setAddress}
                setEditModalOpen={setEditModalOpen}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{paddingTop: 60}}
          contentContainerStyle={{padding: 20}}
          ListFooterComponent={() => <View style={{margin: 30}} />}
        />
      )}
      <AddAddressModal />
      <EditAddressModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        address={address}
      />
    </View>
  );
};

export default AddressScreen;

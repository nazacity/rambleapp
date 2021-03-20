import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AddEmergencyContactModal from '../../components/modal/AddEmergencyContactModal';
import {useSelector} from 'react-redux';
import {COLORS, FONTS} from '../../constants';
import {useDispatch} from 'react-redux';
import EmergencyCard from '../../components/card/EmergencyCard';
import {setEmergencyModal} from '../../redux/actions/AppStateAction';
// import MenuButton from '../../components/layout/MenuButton';
import BackButton from '../../components/layout/BackButton';
import AddButton from '../../components/layout/AddButton';
import LocalizationContext from '../LocalizationContext';
import EditEmergencyContactModal from '../../components/modal/EditEmergencyContactModal';

const EmergencyContactScreen = () => {
  const emergency_contacts = useSelector(
    (state) => state.user.emergency_contacts,
  );
  const dispatch = useDispatch();
  const {t} = React.useContext(LocalizationContext);

  const [emergency, setEmergency] = useState({
    _id: '',
    name: '',
    relationship: '',
    phone_number: '',
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
      {/* <MenuButton /> */}
      <BackButton />
      {emergency_contacts.length < 3 && (
        <AddButton
          onPress={() => {
            dispatch(setEmergencyModal(true));
          }}
        />
      )}
      {emergency_contacts.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            {t('emergencycontact.noemrgencycontact')}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={emergency_contacts}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <EmergencyCard
                item={item}
                // deletable={true}
                editable={true}
                setEmergency={setEmergency}
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
      <AddEmergencyContactModal />
      <EditEmergencyContactModal
        open={editModalOpen}
        handleClose={handleEditModalClose}
        emergency={emergency}
      />
    </View>
  );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({});

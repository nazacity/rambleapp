import React, {Fragment} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AddEmergencyContactModal from '../../components/modal/AddEmergencyContactModal';
import {useSelector} from 'react-redux';
import {COLORS, FONTS} from '../../constants';
import {useDispatch} from 'react-redux';
import EmergencyCard from '../../components/card/EmergencyCard';
import {setEmergencyModal} from '../../redux/actions/AppStateAction';
import MenuButton from '../../components/layout/MenuButton';
import AddButton from '../../components/layout/AddButton';
import LocalizationContext from '../LocalizationContext';

const EmergencyContactScreen = () => {
  const emergency_contacts = useSelector(
    (state) => state.user.emergency_contacts,
  );
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
          dispatch(setEmergencyModal(true));
        }}
      />
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
            return <EmergencyCard key={index} item={item} deletable={true} />;
          }}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          style={{paddingTop: 60}}
          contentContainerStyle={{padding: 20}}
          ListFooterComponent={() => <View style={{margin: 30}} />}
        />
      )}
      <AddEmergencyContactModal />
    </View>
  );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({});

import React, {Fragment} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AddEmergencyContactModal from '../../components/modal/AddEmergencyContactModal';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants';
import {useDispatch} from 'react-redux';
import EmergencyCard from '../../components/card/EmergencyCard';
import {setEmergencyModal} from '../../redux/actions/AppStateAction';
import MenuButton from '../../components/layout/MenuButton';
import AddButton from '../../components/layout/AddButton';

const EmergencyContactScreen = () => {
  const emergency_contacts = useSelector(
    (state) => state.user.emergency_contacts,
  );
  const dispatch = useDispatch();
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={emergency_contacts}
        keyExtractor={(item) => `${item._id}`}
        renderItem={({item, index}) => {
          return <EmergencyCard key={index} item={item} deletable={true} />;
        }}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{borderBottomColor: COLORS.primary, borderBottomWidth: 2}}
        //   />
        // )}

        style={{paddingTop: 60}}
      />
      <AddEmergencyContactModal />
    </View>
  );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({});

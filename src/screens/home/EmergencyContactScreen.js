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
import LocalizationContext from '../LocalizationContext';
import {deleteEmergencyContact} from '../../redux/actions/UserAction';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmergencyCard from '../../components/card/EmergencyCard';

const EmergencyContactScreen = () => {
  const emergency_contacts = useSelector(
    (state) => state.user.emergency_contacts,
  );
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {emergency_contacts.map((item, index) => {
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
              <EmergencyCard key={index} item={item} deletable={true} />
            </View>
          );
        })}
      </ScrollView>
      <AddEmergencyContactModal />
    </Fragment>
  );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({});

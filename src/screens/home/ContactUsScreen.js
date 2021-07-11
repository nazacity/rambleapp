import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {COLORS, FONTS, SIZES, ramble} from '../../constants';
import PolicyModal from '../../components/authorizing/PolicyModal';
import UserAgreementModal from '../../components/authorizing/UserAgreementModal';
import PDPAModal from '../../components/authorizing/PDPAModal';
import {setPDPAModal} from '../../redux/actions/AppStateAction';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';

const ContactUsScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const handlePolicyModalClose = () => {
    setPolicyModalOpen(false);
  };

  const [userAgreementModalOpen, setUserAgreementModalOpen] = useState(false);
  const handleUserAgreementModalClose = () => {
    setUserAgreementModalOpen(false);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {}}>
          <Text style={[FONTS.body3]}>Email: </Text>
          <View style={{flex: 1}} />
          <Text style={[FONTS.body3]}>ramblemarathon@gmail.com</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {}}>
          <Text style={[FONTS.body3]}>{t('signin.phone')}: </Text>
          <View style={{flex: 1}} />
          <Text style={[FONTS.body3]}>+66881493995</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderRadius: 20,
            marginLeft: 5,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          }}
          onPress={() => {
            Linking.openURL(`https://ramble-club.com/`);
          }}>
          <Text style={[FONTS.body3]}>{t('signin.website')}:</Text>
          <View style={{flex: 1}} />
          <Text style={[FONTS.body3]}>Ramble-club.com</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: SIZES.width - 60,
    alignSelf: 'center',
  },
});

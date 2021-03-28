import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {COLORS, FONTS, SIZES} from '../../constants';
import PolicyModal from '../../components/authorizing/PolicyModal';
import UserAgreementModal from '../../components/authorizing/UserAgreementModal';
import PDPAModal from '../../components/authorizing/PDPAModal';
import {setPDPAModal} from '../../redux/actions/AppStateAction';
import {useDispatch, useSelector} from 'react-redux';

const AboutRambleScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const handlePolicyModalClose = () => {
    setPolicyModalOpen(false);
  };
  const version = useSelector((state) => state.appState.version);

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
          <Text style={[FONTS.body3]}>Ramble Version {version}</Text>
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
          onPress={() => {
            setPolicyModalOpen(true);
          }}>
          <Text style={[FONTS.body3]}>{t('signup.policy')}</Text>
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
          onPress={() => {
            setUserAgreementModalOpen(true);
          }}>
          <Text style={[FONTS.body3]}>{t('signup.useragreement')}</Text>
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
          onPress={() => {
            dispatch(setPDPAModal(true));
          }}>
          <Text style={[FONTS.body3]}>{t('signin.pdpa')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <PolicyModal
        open={policyModalOpen}
        handleClose={handlePolicyModalClose}
        nobutton={true}
      />
      <UserAgreementModal
        open={userAgreementModalOpen}
        handleClose={handleUserAgreementModalClose}
        nobutton={true}
      />
      <PDPAModal closable={true} />
    </SafeAreaView>
  );
};

export default AboutRambleScreen;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: SIZES.width - 60,
    alignSelf: 'center',
  },
});

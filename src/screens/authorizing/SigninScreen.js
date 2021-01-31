import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
// import {useSelector} from 'react-redux';

import {FONTS, COLORS} from '../../constants';
// import LocalizationContext from '../LocalizationContext';
import SigninForm from '../../components/authorizing/SigninForm';
import {useDispatch} from 'react-redux';
import {setEn, setTh} from '../../redux/actions/AppStateAction';
import {Avatar} from 'react-native-elements';

const SigninScreen = ({navigation}) => {
  // const lang = useSelector((state) => state.appState.lang);
  // const {t} = React.useContext(LocalizationContext);
  const SLIDE_HEIGHT = 100;
  const dispatch = useDispatch();

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          {
            height: SLIDE_HEIGHT,
            borderBottomRightRadius: 75,
            backgroundColor: COLORS.pinkPastel,
          },
        ]}></View>
      <View style={{flex: 1}}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: COLORS.pinkPastel,
          }}></View>

        <SigninForm />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <TouchableOpacity onPress={() => dispatch(setTh())}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Avatar
              rounded
              source={require('../../../assets/nationicon/thailand.png')}
              containerStyle={{backgroundColor: '#fff', marginRight: 5}}
              size={20}
            />
            <Text style={[FONTS.body5]}>ไทย</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setEn())}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Avatar
              rounded
              source={require('../../../assets/nationicon/united-kingdom.png')}
              containerStyle={{backgroundColor: '#fff', marginRight: 5}}
              size={20}
            />
            <Text style={[FONTS.body5]}>Eng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SigninScreen;

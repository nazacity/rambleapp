import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {Avatar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import profile from '../../../assets/profile/profile.png';
import backgroundprofile from '../../../assets/profile/backgroundprofile.png';
import {SIZES, FONTS, COLORS, SHADOW} from '../../constants';
// import Distance from './userdetail/Distance';
// import Average from './userdetail/Average';
// import Time from './userdetail/Time';
import Distance from './userdetail/Distance2';
import Activity from './userdetail/Activity';
import {useNavigation} from '@react-navigation/native';
import {post} from '../../redux/actions/request';

const UserDetail = ({marginTop, editable}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  // const userRecords = useSelector((state) => state.user.user_records);
  const [data, setData] = useState({});
  const navigation = useNavigation();

  const getThisYearRecord = async () => {
    try {
      const res = await post('/api/users/getuseryearrecord', {
        year: new Date().getFullYear().toString(),
      });
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getThisYearRecord();
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={[
        {
          backgroundColor: 'white',
          marginBottom: 10,
          marginHorizontal: 20,
          borderRadius: 15,
          marginTop: marginTop ? marginTop : 0,
        },
        SHADOW.default,
      ]}>
      <View
        style={{
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={
            user.user_background_picture_url
              ? {uri: user.user_background_picture_url}
              : backgroundprofile
          }
          style={[
            {
              flex: 1,
            },
            SHADOW.default,
          ]}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 25,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <Avatar
              rounded
              source={
                user.user_picture_url ? {uri: user.user_picture_url} : profile
              }
              size={80}
              containerStyle={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: editable ? 30 : 0,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    {
                      paddingTop: 4,
                      color: '#fff',
                    },
                    FONTS.h3,
                  ]}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text
                  style={[
                    {
                      paddingTop: 4,
                      color: '#fff',
                    },
                    FONTS.body4,
                  ]}>
                  {user.display_name}
                </Text>
              </View>
              {editable && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{marginLeft: 10}}
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <MaterialCommunityIcons
                    name="account-edit"
                    color={COLORS.inputPlaceholderColor}
                    size={25}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ImageBackground>
        <View style={{flexDirection: 'row', paddingVertical: 20}}>
          {/* <Distance /> */}
          {/* <Average /> */}
          {/* <Time /> */}
          <Distance distance={data.distance} />
          <View style={{flex: 1}} />
          <Activity activity_number={data.activity_number} />
        </View>
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});

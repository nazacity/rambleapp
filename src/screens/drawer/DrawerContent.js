import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import profile from '../../../assets/profile/profile.png';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  HomeIcon,
  UpcomingIcon,
  HistoryIcon,
  UserIcon,
  SignoutIcon,
} from '../../components/Icon';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setEn, setTh} from '../../redux/actions/AppStateAction';
import {signOut} from '../../redux/actions/UserAction';

import LocalizationContext from '../LocalizationContext';

import {Drawer, Title, Caption} from 'react-native-paper';
import {FONTS, COLORS} from '../../constants';
import DropDownPicker from 'react-native-dropdown-picker';

const langData = [
  {
    label: 'ไทย',
    value: 'th',
    icon: () => (
      <Avatar
        rounded
        source={require('../../../assets/nationicon/thailand.png')}
        containerStyle={{backgroundColor: '#fff', marginRight: 5}}
        size={20}
      />
    ),
  },
  {
    label: 'Eng',
    value: 'en',
    icon: () => (
      <Avatar
        rounded
        source={require('../../../assets/nationicon/united-kingdom.png')}
        containerStyle={{backgroundColor: '#fff', marginRight: 5}}
        size={20}
      />
    ),
  },
];

const DrawerContent = (props) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.appState.lang);
  const dispatch = useDispatch();
  const [focus, setFocus] = useState({});

  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', margin: 15}}>
              <Avatar
                rounded
                source={
                  user.user_background_picture_url
                    ? {uri: user.user_picture_url}
                    : profile
                }
                size={60}
                containerStyle={{borderWidth: 1, borderColor: COLORS.primary}}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={[FONTS.h3]}>{user.display_name}</Title>
                <Caption style={[FONTS.body4]}>
                  {user.first_name} {user.last_name}
                </Caption>
              </View>
            </View>
          </View>
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <View style={{marginLeft: 2}}>
                <HomeIcon color={color} size={22} />
              </View>
            )}
            label={t('drawer.home')}
            labelStyle={[FONTS.h4]}
            onPress={() => {
              props.navigation.jumpTo('home', {
                screen: 'Home',
              });
              props.navigation.closeDrawer();
            }}
          />
          <DrawerItem
            icon={({color, size}) => <UpcomingIcon color={color} size={size} />}
            label={t('drawer.upcoming')}
            labelStyle={[FONTS.h4]}
            onPress={() => {
              props.navigation.jumpTo('home', {
                screen: 'UpcomingActivity',
              });
              props.navigation.closeDrawer();
            }}
          />
          <DrawerItem
            icon={({color, size}) => <HistoryIcon color={color} size={22} />}
            label={t('drawer.history')}
            labelStyle={[FONTS.h4]}
            onPress={() => {
              props.navigation.jumpTo('home', {
                screen: 'HistoryActivity',
              });
              props.navigation.closeDrawer();
            }}
          />
          {/* <DrawerItem
            icon={({color, size}) => (
              <AntDesign name="profile" color={color} size={22} />
            )}
            label={t('drawer.userposts')}
            labelStyle={[FONTS.h4]}
            onPress={() => {
              props.navigation.jumpTo('home', {
                screen: 'UserPost',
              });
              props.navigation.closeDrawer();
            }}
          /> */}
        </Drawer.Section>
      </DrawerContentScrollView>
      <DropDownPicker
        items={langData}
        defaultValue={lang}
        containerStyle={{height: 40, marginHorizontal: 20}}
        style={[
          {
            paddingHorizontal: 10,
            backgroundColor: 'white',
            borderWidth: 0,
          },
        ]}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        zIndex={5000}
        dropDownStyle={{
          backgroundColor: COLORS.backgroundColor,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          zIndex: 400,
        }}
        onChangeItem={(item) => {
          if (item.value === 'en') {
            dispatch(setEn());
          } else if (item.value === 'th') {
            dispatch(setTh());
          }
        }}
        onOpen={() => {
          setFocus({...focus, region: true});
        }}
        onClose={() => {
          setFocus({...focus, region: false});
        }}
      />
      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => <UserIcon color={color} size={size} />}
          label={t('drawer.profile')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'Profile',
            });
            props.navigation.closeDrawer();
          }}
        />
        {/* <DrawerItem
          icon={({color, size}) => <LocationIcon color={color} size={size} />}
          label={t('drawer.address')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'Address',
            });
            props.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({color, size}) => <EmergencyIcon color={color} size={20} />}
          label={t('drawer.emergencycontact')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'EmergencyContact',
            });
            props.navigation.closeDrawer();
          }}
        /> */}
        <DrawerItem
          icon={({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={22} />
          )}
          label={t('drawer.setting')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'Setting',
            });
            props.navigation.closeDrawer();
          }}
        />
      </Drawer.Section>
      <DrawerItem
        icon={({color, size}) => <SignoutIcon color={color} size={18} />}
        label={t('drawer.signout')}
        // labelStyle={{fontFamily: ''}}
        onPress={async () => {
          // await AsyncStorage.removeItem('authToken');
          await props.navigation.navigate('home', {screen: 'Home'});
          await props.navigation.closeDrawer();
          dispatch(signOut(props.navigation));
        }}
      />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  buttomDrawerSection: {},
});

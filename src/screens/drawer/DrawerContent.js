import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar} from 'react-native-elements';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  HomeIcon,
  UpcomingIcon,
  HistoryIcon,
  PostIcon,
  UserIcon,
  LocationIcon,
  EmergencyIcon,
} from '../../components/Icon';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setEn, setTh} from '../../redux/actions/AppStateAction';
import {signOut} from '../../redux/actions/UserAction';

import LocalizationContext from '../LocalizationContext';

import {TouchableOpacity} from 'react-native-gesture-handler';
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
    <View style={{flex: 1, borderTopRightRadius: 100, backgroundColor: '#fff'}}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', margin: 15}}>
              <Avatar rounded source={{uri: user.user_picture_url}} size={60} />
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
              <HomeIcon color={COLORS.primary} size={25} />
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
            icon={({color, size}) => (
              <UpcomingIcon color={COLORS.primary} size={25} />
            )}
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
            icon={({color, size}) => (
              <HistoryIcon color={COLORS.primary} size={25} />
            )}
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
              <PostIcon color={COLORS.primary} size={25} />
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
          icon={({color, size}) => (
            <UserIcon color={COLORS.primary} size={25} />
          )}
          label={t('drawer.profile')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'Profile',
            });
            props.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <LocationIcon color={COLORS.primary} size={25} />
          )}
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
          icon={({color, size}) => (
            <EmergencyIcon color={COLORS.primary} size={25} />
          )}
          label={t('drawer.emergencycontact')}
          labelStyle={[FONTS.h4]}
          onPress={() => {
            props.navigation.jumpTo('home', {
              screen: 'EmergencyContact',
            });
            props.navigation.closeDrawer();
          }}
        />
      </Drawer.Section>
      <DrawerItem
        icon={({color, size}) => (
          <MaterialCommunityIcons
            name="exit-to-app"
            color={color}
            size={size}
          />
        )}
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

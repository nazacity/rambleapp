import React from 'react';
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

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setEn, setTh} from '../../redux/actions/AppStateAction';
import {signOut} from '../../redux/actions/UserAction';

import LocalizationContext from '../LocalizationContext';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Drawer, Title, Caption} from 'react-native-paper';
import {FONTS, COLORS} from '../../constants';

const DrawerContent = (props) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
              <Feather name="home" color={COLORS.primary} size={25} />
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
              <Feather name="activity" color={COLORS.primary} size={25} />
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
              <MaterialCommunityIcons
                name="history"
                color={COLORS.primary}
                size={25}
              />
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
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="post"
                color={COLORS.primary}
                size={25}
              />
            )}
            label={t('drawer.userposts')}
            labelStyle={[FONTS.h4]}
            onPress={() => {
              props.navigation.jumpTo('home', {
                screen: 'UserPost',
              });
              props.navigation.closeDrawer();
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
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
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="account"
              color={COLORS.primary}
              size={25}
            />
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
            <Ionicons
              name="location-outline"
              color={COLORS.primary}
              size={25}
            />
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
            <MaterialCommunityIcons
              name="contacts"
              color={COLORS.primary}
              size={25}
            />
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
          dispatch(signOut());
        }}
      />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  buttomDrawerSection: {},
});

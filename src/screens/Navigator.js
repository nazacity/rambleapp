import React, {useEffect} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';

// Screen
import HomeScreen from './home/HomeScreen';
import ActivityDetailScreen from './home/ActivityDetailScreen';
import ActivityRegisterScreen from './home/ActivityRegisterScreen';
import ActivityHistoryScreen from './home/ActivityHistoryScreen';
import ActivityUpcomingScreen from './home/ActivityUpcomingScreen';
import PaymentScreen from './home/PaymentScreen';
import CreatePostScreen from './home/CreatePostScreen';
import ProfileScreen from './home/ProfileScreen';
import EditProfileScreen from './home/EditProfileScreen';
import EmergencyContactScreen from './home/EmergencyContactScreen';
import HistoryActivityScreen from './home/HistoryActivityScreen';
import UpcomingActivityScreen from './home/UpcomingActivityScreen';
import UserPostScreen from './home/UserPostScreen';
import AddressScreen from './home/AddressScreen';
import QrcodeScannerScreen from './home/QrcodeScannerScreen';
import WebViewScreen from './home/WebViewScreen';

import ActivityScreen from './activity/ActivityScreen';
import FilteredActivityScreen from './activity/FilteredActivityScreen';
import ActivityFilterScreen from './activity/ActivityFilterScreen';

import SelectActivityScreen from './community/SelectActivityScreen';
import CommunityScreen from './community/CommunityScreen';
import CommunityFilterScreen from './community/CommunityFilterScreen';
import FilteredCommunityScreen from './community/FilteredCommunityScreen';

import OnboardingScreen from './onboarding/OnboardingScreen';
import SigninScreen from './authorizing/SigninScreen';
import SignupScreen from './authorizing/SignupScreen';
import PhoneNumberCheckScreen from './authorizing/PhoneNumberCheckScreen';
import ConfirmRegisterScreen from './authorizing/ConfirmRegisterScreen';

// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
// theme
import {COLORS} from '../constants';

import LocalizationContext from './LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HeaderBackButton} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAddAddressModal,
  setEmergencyModal,
} from '../redux/actions/AppStateAction';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ActivityIcon, HomeIcon} from '../components/Icon';
import SplashScreen from 'react-native-splash-screen';

const HomeStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const OnboardingAndAuthorizingStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const MainTabScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [route]);
  return (
    <Tab.Navigator
      activeColor={COLORS.pinkPastel}
      inactiveColor={COLORS.inactiveColor}
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: `${t('tab.home')}`,
          tabBarIcon: ({color}) => <HomeIcon color={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => {
            navigation.jumpTo('home', {screen: 'Home'});
          },
        }}
      />
      <Tab.Screen
        name="activity"
        component={ActivityStackScreen}
        options={{
          tabBarLabel: `${t('tab.activity')}`,
          tabBarIcon: ({color}) => <ActivityIcon color={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => {
            navigation.jumpTo('activity', {screen: 'Activty'});
          },
        }}
      />
      {/* <Tab.Screen
        name="community"
        component={CommunityStackScreen}
        options={{
          tabBarLabel: `${t('tab.community')}`,
          tabBarIcon: ({color}) => (
            <Ionicons name="md-people-circle-sharp" color={color} size={24} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            navigation.jumpTo('community', {screen: 'SelectActivity'});
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ActivityRegister"
        component={ActivityRegisterScreen}
      />
      <HomeStack.Screen
        name="ActivityHistory"
        component={ActivityHistoryScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
            },
            shadowRadius: 0,
          },
        }}
      />
      <HomeStack.Screen
        name="ActivityUpcoming"
        component={ActivityUpcomingScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Payment" component={PaymentScreen} />
      <HomeStack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="QrcodeScanner"
        component={QrcodeScannerScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
            },
            shadowRadius: 0,
          },
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setEmergencyModal(true));
              }}
              style={{marginRight: 10}}>
              <Ionicons
                name="add"
                size={25}
                backgroundColor="transparent"
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="HistoryActivity"
        component={HistoryActivityScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="UpcomingActivity"
        component={UpcomingActivityScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="UserPost"
        component={UserPostScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <HomeStack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setAddAddressModal(true));
              }}
              style={{marginRight: 10}}>
              <Ionicons
                name="add"
                size={25}
                backgroundColor="transparent"
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen name="WebView" component={WebViewScreen} />
    </HomeStack.Navigator>
  );
};

const ActivityStackScreen = ({navigation}) => {
  return (
    <ActivityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <ActivityStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View style={{paddingRight: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ActivityFilter')}>
                  <Ionicons
                    name="ios-options-sharp"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <ActivityStack.Screen
        name="FilteredActivity"
        component={FilteredActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <ActivityStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <ActivityStack.Screen
        name="ActivityFilter"
        component={ActivityFilterScreen}
        options={{headerShown: false}}
      />
      <ActivityStack.Screen name="WebView" component={WebViewScreen} />
    </ActivityStack.Navigator>
  );
};

const CommunityStackScreen = ({navigation}) => {
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <CommunityStack.Screen
        name="SelectActivity"
        component={SelectActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommunityStack.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          headerLeft: () => {
            return (
              <View style={{paddingLeft: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons
                    name="ios-menu"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View style={{paddingRight: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CommunityFilter')}>
                  <Ionicons
                    name="ios-options-sharp"
                    size={25}
                    borderRadius={50}
                    backgroundColor={COLORS.pinkPastel}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <CommunityStack.Screen
        name="CommunityFilter"
        component={CommunityFilterScreen}
        options={{
          headerShown: false,
        }}
      />
      <CommunityStack.Screen
        name="FilteredCommunity"
        component={FilteredCommunityScreen}
        options={{
          headerShown: false,
        }}
      />
    </CommunityStack.Navigator>
  );
};

export const OnboardingAndAuthorizingStackScreen = () => {
  return (
    <OnboardingAndAuthorizingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingAndAuthorizingStack.Screen
        name="Onborading"
        component={OnboardingScreen}
      />
      <OnboardingAndAuthorizingStack.Screen
        name="Signin"
        component={SigninScreen}
      />
      <OnboardingAndAuthorizingStack.Screen
        name="Signup"
        component={SignupScreen}
      />
      <OnboardingAndAuthorizingStack.Screen
        name="PhoneNumberCheck"
        component={PhoneNumberCheckScreen}
      />
      <OnboardingAndAuthorizingStack.Screen
        name="ConfirmRegister"
        component={ConfirmRegisterScreen}
      />
    </OnboardingAndAuthorizingStack.Navigator>
  );
};

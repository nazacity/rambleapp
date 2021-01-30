import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icomoonConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(icomoonConfig);

export const ActivityIcon = ({color, size}) => (
  <Icon name="activity" size={size} color={color} />
);

export const CommunityIcon = ({color, size}) => (
  <Icon name="community" size={size} color={color} />
);

export const HomeIcon = ({color, size}) => (
  <Icon name="home" size={size} color={color} />
);

export const UpcomingIcon = ({color, size}) => (
  <Icon name="upcoming" size={size} color={color} />
);

export const HistoryIcon = ({color, size}) => (
  <Icon name="history" size={size} color={color} />
);

export const UserIcon = ({color, size}) => (
  <Icon name="user" size={size} color={color} />
);

export const LocationIcon = ({color, size}) => (
  <Icon name="location" size={size} color={color} />
);

export const EmergencyIcon = ({color, size}) => (
  <Icon name="emergency" size={size} color={color} />
);

export const MenuIcon = ({color, size}) => (
  <Icon name="menu" size={size} color={color} />
);

export const SignoutIcon = ({color, size}) => (
  <Icon name="signout" size={size} color={color} />
);

export const FilterIcon = ({color, size}) => (
  <Icon name="filter" size={size} color={color} />
);

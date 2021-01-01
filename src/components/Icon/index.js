import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export const ActivityIcon = ({color, size}) => (
  <Icon name="activity" size={size} color={color} />
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

export const PostIcon = ({color, size}) => (
  <Icon name="post" size={size} color={color} />
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

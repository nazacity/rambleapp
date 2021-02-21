import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {FONTS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';
import TitleHeader from '../layout/TitleHeader';
import SocialFlatlist from './social/SocialFlatlist';

const SocialContainer = () => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const user_activities = useSelector((state) => state.user.user_activities);

  return (
    <View>
      <TitleHeader
        title={t('community.social')}
        seeAll={
          user_activities.length > 5
            ? () => {
                navigation.jumpTo('community', {
                  screen: 'SocialCommunity',
                });
              }
            : undefined
        }
        paddingHorizontal={20}
        noDot={true}
      />
      <SocialFlatlist />
      <View style={{margin: 10}} />
    </View>
  );
};

export default SocialContainer;

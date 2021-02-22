import React, {Fragment} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import LocalizationContext from '../../screens/LocalizationContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../constants';
import {minor_advertise} from '../../config/data';
import ImageModal from 'react-native-image-modal';

const MinorAdvertise = () => {
  const {t} = React.useContext(LocalizationContext);

  const MinorAdvertiseCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {}}
        style={{
          marginRight: minor_advertise.length === index + 1 ? 40 : 0,
          overflow: 'hidden',
          backgroundColor: COLORS.backgroundColor,
          borderRadius: 5,
        }}>
        <ImageModal
          isTranslucent={false}
          resizeMode="contain"
          imageBackgroundColor={COLORS.background}
          overlayBackgroundColor="rgba(0,0,0,0.3)"
          source={item.picture_url}
          // renderFooter={(onClose) => (
          //   <TouchableOpacity
          //     onPress={onClose}
          //     style={{
          //       backgroundColor: '#FFFFFF',
          //       height: 100,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //     }}>
          //     <Text>CloseButton</Text>
          //   </TouchableOpacity>
          // )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginBottom: 20}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={minor_advertise}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item, index}) => {
          return <MinorAdvertiseCard item={item} index={index} />;
        }}
        ItemSeparatorComponent={() => <View style={{padding: 10}} />}
        style={{paddingHorizontal: 20}}
      />
    </View>
  );
};

export default MinorAdvertise;

const styles = StyleSheet.create({});

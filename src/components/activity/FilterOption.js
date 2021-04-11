import React, {useRef, Fragment, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native';
import {StatusBar} from 'react-native';

const FilterOption = ({
  state,
  setState,
  filterOption,
  filterRef,
  ViewButtonDisplay,
  loading1,
}) => {
  const lang = useSelector((state) => state.appState.lang);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          width: SIZES.width - 100,
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.lightOpcaityBlack,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          flexDirection: 'row',
        }}
        onPress={() => {
          setOpen(true);
        }}>
        <Ionicons
          name="search"
          size={20}
          style={{position: 'absolute', right: 5}}
          color={COLORS.darkOpacityBlack}
        />
        <Text style={[FONTS.h4, {color: COLORS.darkOpacityBlack}]}>
          {lang === 'th' ? state.item_th : lang === 'en' && state.item_en}
        </Text>
      </TouchableOpacity>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={open}
        style={{
          margin: 0,
          justifyContent: 'center',
          zIndex: 1,
          alignItems: 'center',
        }}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}>
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            width: SIZES.width - 60,
          }}>
          {loading1 && (
            <View
              style={{
                position: 'absolute',
                zIndex: 500,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: SIZES.width - 60,
                height: 350,
                backgroundColor: COLORS.lightOpcaityBlack,
              }}>
              <ActivityIndicator color={COLORS.primary} size={30} />
            </View>
          )}
          <FlatList
            ref={filterRef}
            ListHeaderComponent={ViewButtonDisplay}
            data={filterOption}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingHorizontal: 20,
              alignItems: 'center',
              backgroundColor: COLORS.backgroundColor,
            }}
            ItemSeparatorComponent={() => (
              <View style={{marginHorizontal: 5}} />
            )}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    {
                      backgroundColor: COLORS.backgroundColor,
                      borderRadius: 5,
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={loading1}
                    style={{
                      height: 50,
                      width: SIZES.width - 60,
                      backgroundColor:
                        state.id === item.id
                          ? COLORS.primary
                          : COLORS.backgroundColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={async () => {
                      // filterRef.current.scrollToIndex({
                      //   animated: true,
                      //   index: index,
                      //   viewOffset: SIZES.width / 2 - 100,
                      // });
                      setState(item);
                      await item.function();
                      handleClose();
                    }}>
                    <Text
                      style={[
                        FONTS.h4,
                        {
                          color:
                            state.id === item.id ? COLORS.white : COLORS.black,
                        },
                      ]}>
                      {lang === 'th' && item.item_th}
                      {lang === 'en' && item.item_en}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </Fragment>
  );
};

export default FilterOption;

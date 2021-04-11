import React from 'react';
import {View, TouchableOpacity, Platform, StatusBar} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SHADOW} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setLoading} from '../../../redux/actions/AppStateAction';
import {useDispatch} from 'react-redux';

const ViewButton = ({top, setView, view, loadAll, setState}) => {
  const dispatch = useDispatch();
  const changeView = async (v) => {
    dispatch(setLoading(true));
    setState({id: '0', item_th: 'ทุกภาค', item_en: 'All region'});
    await loadAll();
    setView(v);
    dispatch(setLoading(false));
  };
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.lightOpcaityBlack,
          borderRadius: 3,
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: COLORS.lightOpcaityBlack,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          await changeView(0);
        }}
        style={{
          backgroundColor:
            view === 0 ? COLORS.backgroundColor : COLORS.inputPlaceholderColor,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="view-agenda"
          size={16}
          backgroundColor="transparent"
          color={view === 0 ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          await changeView(1);
        }}
        style={{
          backgroundColor:
            view === 1 ? COLORS.backgroundColor : COLORS.inputPlaceholderColor,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome5
          name="map-marked-alt"
          size={16}
          backgroundColor="transparent"
          color={view === 1 ? COLORS.primary : COLORS.opcaityBlack}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewButton;

import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW} from '../../constants';

import {get} from '../../redux/actions/request';
import LocalizationContext from '../../screens/LocalizationContext';
import dayjs from 'dayjs';
import TitleHeader from '../layout/TitleHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RecieptModal from '../modal/RecieptModal';

const Transaction = ({userActivity}) => {
  const {t} = React.useContext(LocalizationContext);
  const [reciept, setReciept] = useState({
    _id: '',
    amount: 0,
    id: '',
    payDate: '',
    sendingBank: '',
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const [transactionData, setTransactionData] = useState([]);
  // const fetchTransaction = async () => {
  //   if (userActivity.transaction.length > 0) {
  //     const getTransactionsData = async () => {
  //       return Promise.all(
  //         userActivity.transaction.map(async (item) => {
  //           const res = await get(
  //             `/api/users/requestbillpaymentbytransactions/${userActivity._id}/${item._id}`,
  //           );
  //           console.log(res);
  //           return res;
  //         }),
  //       );
  //     };

  //     let data = getTransactionsData();

  //     setTransactionData(data);
  //   }
  // };

  // const fetchTransaction = async () => {
  //   if (userActivity.transaction.length > 0) {
  //     const getTransactionsData = async () => {
  //       return Promise.all(
  //         userActivity.transaction.map(async (item) => {
  //           const res = await get(
  //             `/api/users/requestbillpaymentbyinquiry/${userActivity._id}/${item._id}`,
  //           );
  //           console.log(res);
  //           return res;
  //         }),
  //       );
  //     };

  //     let data = getTransactionsData();

  //     setTransactionData(data);
  //   }
  // };

  // useEffect(() => {
  //   fetchTransaction();
  // }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TitleHeader title={t('activity.payment')} />
      {userActivity.transaction.length > 0 ? (
        userActivity.transaction.map((item) => {
          return (
            <View
              key={item._id}
              style={[
                {
                  borderRadius: 5,
                  backgroundColor: COLORS.white,
                  margin: 10,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                SHADOW.default,
              ]}>
              <Image
                source={require('../../../assets/logo/ramble512.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[FONTS.h3]}>{t('activity.transaction')}</Text>
                  <View style={{flex: 1}} />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{borderRadius: 15}}
                    onPress={() => {
                      setReciept(item);
                      setOpen(true);
                    }}>
                    <MaterialIcons
                      name="more-vert"
                      size={20}
                      color={COLORS.darkOpacityBlack}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[FONTS.body4, {width: 70}]}>
                    {t('activity.date')} :
                  </Text>
                  <Text style={[FONTS.body4]}>
                    {dayjs(item.payDate).format('D MMM YY')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[FONTS.body4, {width: 70}]}>
                    {t('activity.time')} :{' '}
                  </Text>
                  <Text style={[FONTS.body4]}>
                    {dayjs(item.payDate).format('HH:mm')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[FONTS.body4, {width: 70}]}>
                    {t('activity.amount')} :{' '}
                  </Text>
                  <Text style={[FONTS.body4]}>{item.amount} </Text>
                  <Text style={[FONTS.body4]}>{t('activity.bath')}</Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text style={[FONTS.body2]}>{t('activity.notransfer')}</Text>
        </View>
      )}
      <RecieptModal
        open={open}
        handleClose={handleClose}
        userActivity={userActivity}
        reciept={reciept}
      />
    </ScrollView>
  );
};

export default Transaction;

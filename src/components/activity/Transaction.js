import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {get} from '../../redux/actions/request';

const Transaction = ({userActivity}) => {
  const [transactionData, setTransactionData] = useState([]);
  //   const fetchTransaction = async () => {
  // if (userActivity.transaction.length > 0) {
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
  // }
  //   };

  const fetchTransaction = async () => {
    if (userActivity.transaction.length > 0) {
      const getTransactionsData = async () => {
        return Promise.all(
          userActivity.transaction.map(async (item) => {
            const res = await get(
              `/api/users/requestbillpaymentbyinquiry/${userActivity._id}/${item._id}`,
            );
            console.log(res);
            return res;
          }),
        );
      };

      let data = getTransactionsData();

      setTransactionData(data);
    }
  };

  console.log(transactionData);
  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <View>
      <Text>Transaction</Text>
    </View>
  );
};

export default Transaction;

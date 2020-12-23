import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setSnackbarDismiss} from '../../redux/actions/AppStateAction';

const SnackbarNotification = () => {
  const snackbar = useSelector((state) => state.appState.snackbar);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(setSnackbarDismiss());
  };
  return (
    <Snackbar
      visible={snackbar.display}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor:
          snackbar.state === 'error'
            ? '#d9534f'
            : snackbar.state === 'success'
            ? '#5cb85c'
            : snackbar.state === 'warning' && '#f0ad4e',
        margin: 20,
      }}
      duration={1500}>
      {snackbar.message}
    </Snackbar>
  );
};

export default SnackbarNotification;

const styles = StyleSheet.create({});

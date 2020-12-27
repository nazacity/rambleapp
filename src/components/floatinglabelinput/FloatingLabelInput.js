import React, {Fragment, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {Input} from 'react-native-elements';
import {FONTS, COLORS} from '../../constants';

const FloatingLabelInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: 'absolute',
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 5],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -20],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', COLORS.primary],
    }),
  };

  const BorderColor = {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.inputPlaceholderColor, COLORS.primary],
    }),
    marginVertical: 10,
  };

  useEffect(() => {
    if (props.value) {
      Animated.timing(animatedIsFocused, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedIsFocused, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused]);

  // if (props.value) {
  //   Animated.timing(animatedIsFocused, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
  // }

  return (
    <Animated.View style={BorderColor}>
      <Animated.Text style={labelStyle}>{props.floatingLabel}</Animated.Text>
      <Input
        {...props}
        onFocus={() => {
          handleFocus();
          if (props.onFocus) {
            props.onFocus();
          }
        }}
        onBlur={() => {
          handleBlur();
          if (props.onBlur) {
            props.onBlur();
          }
        }}
        containerStyle={{height: 50}}
        blurOnSubmit
        inputStyle={{fontFamily: 'SF-Pro-Text-Regular'}}
      />
    </Animated.View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({});

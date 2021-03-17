import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import filledstarimage from '../../../assets/ratingicon/star_filled.png';
import cornerstarimage from '../../../assets/ratingicon/star_corner.png';

const RatingBar = ({size, disratable, value, onPress}) => {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 5,
      }}>
      {maxRating.map((item, index) => {
        return (
          <TouchableOpacity
            disabled={disratable}
            activeOpacity={0.7}
            key={item}
            onPress={() => onPress(item)}
            style={{marginLeft: 5}}>
            <Image
              style={{
                width: size ? size : 40,
                height: size ? size : 40,
                resizeMode: 'cover',
              }}
              source={item <= value ? filledstarimage : cornerstarimage}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RatingBar;

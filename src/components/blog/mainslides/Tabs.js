import React from 'react';
import {View, Text} from 'react-native';
import Indicator from './Indicator';
import Tab from './Tab';
import {SIZES} from '../../../constants';

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          //   console.log(x, y, width, height);
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={{position: 'absolute', top: 50, width: SIZES.width}}>
      <View
        ref={containerRef}
        style={{
          justifyContent: 'space-evenly',
          flex: 1,
          flexDirection: 'row',
          width: SIZES.width,
        }}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item._id}
              item={item}
              ref={item.ref}
              onItemPress={() => {
                onItemPress(index);
              }}
              data={data}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};
export default Tabs;

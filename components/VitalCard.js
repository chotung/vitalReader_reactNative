import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import React, {useState} from 'react';

const VitalCard = (props) => {
  const {type, vitalCounter, setVitalCounter} = props;
  const randomNum = () => {
    return Math.floor(Math.random() * 100);
  };

  const randVital = (vType) => {
    let rand = randomNum();
    let rand2 = randomNum();
    switch (vType) {
      case 'Temp':
        setVitalCounter({
          ...vitalCounter,
          temp: rand,
        });
        break;
      case 'Blood':
        setVitalCounter({
          ...vitalCounter,
          dystolic: rand,
          systolic: rand2,
        });
        break;
      case 'Sp02':
        setVitalCounter({
          ...vitalCounter,
          pulseRate: rand,
          sp02: rand2,
        });
    }
  };
  const renderDiffCards = () => {
    switch (type) {
      case 'Temp':
        return (
          <View>
            <Text>{type}</Text>
            <Text>{vitalCounter.temp}</Text>
            <Button
              title="Press For Temperature"
              onPress={() => randVital(type)}
            />
          </View>
        );
      case 'Blood':
        return (
          <View>
            <Text>{type}</Text>
            <Text>
              {vitalCounter.systolic}
              {vitalCounter.dystolic}
            </Text>
            <Button
              title="Press For Blood Pressures"
              onPress={() => randVital(type)}
            />
          </View>
        );
      case 'Sp02':
        return (
          <View>
            <Text>{type}</Text>
            <Text>
              {vitalCounter.pulseRate}
              {vitalCounter.sp02}
            </Text>
            <Button
              title="Press For Oxygen Levels"
              onPress={() => randVital(type)}
            />
          </View>
        );
      default:
        break;
    }
  };
  // console.log(vitalCounter);

  return <View>{renderDiffCards()}</View>;
};

export default VitalCard;

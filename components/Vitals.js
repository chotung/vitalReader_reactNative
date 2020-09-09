import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import VitalCard from './VitalCard';
import axios from 'axios';

const Vitals = (props) => {
  const [vitalCounter, setVitalCounter] = useState({
    _id: props.users[0]._id,
    temp: 0,
    systolic: 0,
    dystolic: 0,
    sp02: 0,
    pulseRate: 0,
  });
  const sendInfo = () => {
    console.log(vitalCounter);
    axios.put('https://vitalreader.herokuapp.com/api/user/vitals', {
      vitalCounter,
    });
    props.setHome(true);
  };

  return (
    <SafeAreaView>
      <Text>Vitals</Text>
      <VitalCard
        type="Temp"
        vitalCounter={vitalCounter}
        setVitalCounter={setVitalCounter}
      />
      <VitalCard
        type="Blood"
        vitalCounter={vitalCounter}
        setVitalCounter={setVitalCounter}
      />
      <VitalCard
        type="Sp02"
        vitalCounter={vitalCounter}
        setVitalCounter={setVitalCounter}
      />
      <View>
        <Button
          onPress={() => sendInfo()}
          title="COMPLETE"
          color="#000"
          accessibilityLabel="Measure Now"
        />
      </View>
    </SafeAreaView>
  );
};

export default Vitals;

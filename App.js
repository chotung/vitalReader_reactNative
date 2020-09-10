/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import Vitals from './components/Vitals';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import {NativeRouter, Route, Link} from 'react-router-native';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import axios from 'axios';
import moment from 'moment';

const App = () => {
  const [users, setUser] = useState({});
  const [home, setHome] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://vitalreader.herokuapp.com/api/user')
      .then((res) => setUser(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const DATA = [
    {key: 'mon'},
    {key: 'tue'},
    {key: 'wed'},
    {key: 'thu'},
    {key: 'fri'},
    {key: 'sat'},
    {key: 'sun'},
  ];
  const currFullDate = moment().format('MMMM Do YYYY');
  const currDate = moment().format('DD');
  const daysInMonth = moment().daysInMonth();
  const renderVitals = () => {
    return users.map((user) => {
      return (
        <>
          <View style={styles.temp} key="temp">
            <Text style={styles.vitalText}>Temperature</Text>
            <Text style={styles.vitalText}>{user.temp}</Text>
          </View>
          <View style={styles.blood} key="Blood">
            <Text style={styles.vitalText}>Blood</Text>
            <Text style={styles.vitalText}>{user.dystolic}</Text>
            <Text style={styles.vitalText}>{user.systolic}</Text>
          </View>
          <View style={styles.oxygen} key="oxygen">
            <Text style={styles.vitalText}>Oximeter</Text>
            <Text style={styles.vitalText}>{user.sp02}</Text>
            <Text style={styles.vitalText}>{user.pulseRate}</Text>
          </View>
        </>
      );
    });
  };

  return (
    <>
      {home ? (
        <SafeAreaView style={styles.container}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {/* <Header /> */}
            {global.HermesInternal == null ? null : (
              <View>
                <Text>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.header}>
              <View style={styles.innerHeader}>
                <Icon name="menu-outline" size={50} color="#fff" />
                <Text style={styles.headerText}>Vital Reader</Text>
                <Icon name="add-outline" size={50} color="#fff" />
              </View>
              <View>
                <Text style={styles.subHeader}>{currFullDate}</Text>
                <Text style={styles.subHeader}>How are you feeling today?</Text>
              </View>
            </View>
            <View style={styles.main}>
              {/* <View style={styles.dateSection}>{renderDays()}</View> */}
              <View>{isLoading ? <Text>'loading'</Text> : renderVitals()}</View>
              <View style={styles.measureNow}>
                <Button
                  onPress={() => setHome(false)}
                  title="Measure Now"
                  color="#841584"
                  accessibilityLabel="Measure Now"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Vitals users={users} setHome={setHome} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {},
  measureNow: {
    alignSelf: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#e5e5e5',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  day: {
    textTransform: 'capitalize',
    padding: 10,
    color: '#e2e2e2',
  },
  dateSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  subHeader: {
    color: 'white',
    fontSize: 20,
    paddingTop: 3,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  header: {
    color: 'white',
    padding: 12,
    backgroundColor: '#3c2865',
  },
  innerHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temp: {
    backgroundColor: 'red',
  },
  blood: {
    backgroundColor: '#08bdc6',
  },
  oxygen: {
    backgroundColor: '#3c2865',
  },
  vitalText: {
    color: 'white',
  },
});

export default App;

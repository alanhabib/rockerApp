import React from 'react';
import User from './src/containers/User';
import store from './src/Redux/store/index';
import {Provider} from 'react-redux';
import {StyleSheet, View} from 'react-native';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <User />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

export default class HomePage extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }
}

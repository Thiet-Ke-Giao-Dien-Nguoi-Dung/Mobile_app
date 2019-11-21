import React, {Component} from 'react';
import Router from './Router';
// import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <>
        <Router />
      </>
    );
  }
}

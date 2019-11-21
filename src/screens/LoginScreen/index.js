/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {Button, Block, Text, Input} from './../../components';

const {height} = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  _signInAsync = async () => {
    try {
      console.log(this.state);
      await AsyncStorage.setItem('jwt', 'login');
    } catch (error) {}
    this.props.navigation.navigate('App');
  };
  render() {
    const {navigation} = this.props;
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={{flex: 1}}
        keyboardVerticalOffset={height * 0.2}>
        <Block center middle>
          <Block middle>
            <Image
              source={require('../../../assets/img/logo.png')}
              style={{height: 80, width: 102}}
            />
          </Block>
          <Block flex={3} center>
            <Text h3 style={{marginBottom: 6}}>
              Đăng nhập 
            </Text>
            <Text paragraph color="black3" />
            <Block center >
              <Input full email label="Tài khoản" style={{marginBottom: 25}} />
              <Input
                full
                password
                label="Mật khẩu"
                style={{marginBottom: 25}}
                rightLabel={
                  <Text
                    paragraph
                    color="gray"
                    onPress={() => navigation.navigate('App')}>
                    Quên mật khẩu
                  </Text>
                }
              />
              <Button
                full
                style={{marginBottom: 12}}
                onPress={() => this._signInAsync()}>
                <Text button>Đăng nhập</Text>
              </Button>
              <Text paragraph color="gray">
                Bạn chưa có tài khoản?{' '}
                <Text
                  height={18}
                  color="blue"
                  onPress={() => navigation.navigate('Register')}>
                  Tạo tài khoản
                </Text>
              </Text>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}
export default Login;

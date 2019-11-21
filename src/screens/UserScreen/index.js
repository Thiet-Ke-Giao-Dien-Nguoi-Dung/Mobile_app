/* eslint-disable no-unreachable */
import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import {ListItem, Header, Avatar} from 'react-native-elements';
const list = [
  {
    title: 'Tài khoản',
    icon: 'person',
  },
  {
    title: 'Hướng dẫn',
    icon: 'information-circle',
  },
  {
    title: 'Điều khoản',
    icon: 'bookmark',
  },
  {
    title: 'Đổi mật khẩu',
    icon: 'av-timer',
  },
  {
    title: 'Đăng xuất',
    icon: 'information-circle-outline',
    render: (text, row, index) => {
      return (
        <Icon
          reverse
          name="ios-american-football"
          type="ionicon"
          color="#517fa4"
        />
      );
    },
  },
];

export default class UserPage extends Component {
  static navigationOptions = {
    title: 'Cá nhân',
    headerStyle: {
      backgroundColor: '#FF9033',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      alignSelf: 'center',
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View>
        <View style={{alignItems: 'center', margin: 30}}>
          <Avatar
            size="xlarge"
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            showEditButton
          />
        </View>
        <View>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{name: item.icon}}
              bottomDivider
              chevron
              renderItem={item.render}
            />
          ))}
        </View>

        <Button
          title="Logout"
          style={{marginTop: 30, paddingHorizontal: 15}}
          onPress={this._signOutAsync}
        />
      </View>

      // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      // </View>
    );
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

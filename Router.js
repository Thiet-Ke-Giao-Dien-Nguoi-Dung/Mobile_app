import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ChatPage from './src/screens/ChatScreen';
import HomePage from './src/screens/HomeScreen';
import UserPage from './src/screens/UserScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import IconWithBadge from './src/components/NavigationsIcon/IconWithBadge';
import Login from './src/screens/LoginScreen/index';
import {Transition} from 'react-native-reanimated';

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Icon;
  let iconName;
  let typeName;
  if (routeName === 'Trang chủ') {
    iconName = 'home';
  } else if (routeName === 'Liên hệ') {
    iconName = 'comment-discussion';
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Cá nhân') {
    iconName = 'person';
  }
  return (
    <IconComponent
      name={iconName}
      // type={typeName}
      size={25}
      color={tintColor}
    />
  );
};
const Home = createStackNavigator(
  {
    Home: {screen: HomePage},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const User = createStackNavigator(
  {
    Home: {screen: UserPage},
  },
  {
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const NavigateIcon = createAppContainer(
  createBottomTabNavigator(
    {
      'Liên hệ': {screen: ChatPage},
      'Trang chủ': {screen: Home},
      'Cá nhân': {screen: User},
    },
    {
      initialRouteName: 'Trang chủ',
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        adaptive: true,
        scrollEnabled: true,
        activeTintColor: '#FF7400',
        inactiveTintColor: '#586589',
        upperCaseLabel: false,
        tabStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        },
      },
      lazy: true,
      navigationOptions: {
        gestureDirection: 'default',
      },
    },
  ),
);

const AuthStack = createStackNavigator({SignIn: {screen: Login}});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: NavigateIcon,
      Auth: AuthStack,
    },
    {
      animationEnabled: true,
      initialRouteName: 'AuthLoading',
    },
    {
      title: false,
    },
  ),
);

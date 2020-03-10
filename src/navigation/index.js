import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Auth from '../screens/Auth';
import SignInScreen from '../screens/Auth/SignInScreen';
import RestorePasswordScreen from '../screens/Auth/RestorePasswordScreen';
import ConfirmCodeScreen from '../screens/Auth/ConfirmCodeScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen';
import CreateTour from '../screens/CreateTour';
import Checkout from '../screens/Checkout';
import EditTourScreen from '../screens/EditTourScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PreviewToure from '../screens/PreviewToure';
import MyTours from '../screens/MyTours';

import DefaultDrawer from './DefaultDrawer';

const AppDrawerNavigation = createDrawerNavigator(
  {
    MyTours: {
      screen: MyTours,
      navigationOptions: {
        title: 'MyTours',
      },
    },
    CreateTour: {
      screen: CreateTour,
      navigationOptions: {
        title: 'Create Tour',
      },
    },
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
    EditTour: {
      screen: EditTourScreen,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      },
    },
  },
  {
    contentComponent: props => <DefaultDrawer {...props} />,
  },
);

const AppNavigation = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
    SignIn: {
      screen: SignInScreen,
    },
    RestorePassword: {
      screen: RestorePasswordScreen,
    },
    CreateTour: {
      screen: CreateTour,
    },
    Checkout: {
      screen: Checkout
    },
    ConfirmCode: {
      screen: ConfirmCodeScreen,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    CreateAccount: {
      screen: CreateAccountScreen,
    },
    // New navigation
    Home: {
      screen: AppDrawerNavigation,
    },
    PreviewToure: {
      screen: PreviewToure,
    },
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(AppNavigation);

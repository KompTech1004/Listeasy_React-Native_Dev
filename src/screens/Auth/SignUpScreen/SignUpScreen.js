import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';

import HeaderDefault from '../../../components/HeaderDefault';
import GradientText from '../../../components/GradientText';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';

import {globalStyles, fonts, colors} from '../../../constants';

import styles from './styles';

import LoadingView from '../../../components/Loading';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
      device_type: '',
      action_time: '',
    };
  }

  onChangeState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  componentDidUpdate() {
    const {user, error, clearErrorUser, loading} = this.props;

    if (user !== false) {
      this.props.navigation.navigate('CreateAccount');
    }

    if (error !== null && loading === false) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error);
      clearErrorUser();
    }
  }

  handlePressSignUp = async () => {
    const {fullName, email, password, confirmPassword, agree} = this.state;
    const {signUp} = this.props;

    if (!agree) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'First agree terms of use',
      );
    } else if (password !== confirmPassword) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Password do not match',
      );
    } else {
      signUp({
        username: fullName,
        email: email,
        password: password,
      });
    }
  };
  render() {
    const {fullName, email, password, confirmPassword} = this.state;
    const {loading} = this.props;
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <SafeAreaView style={globalStyles.containerFull}>
          <KeyboardAvoidingView
            style={globalStyles.containerFull}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
            <StatusBar
              translucent={false}
              barStyle="dark-content"
              backgroundColor="white"
            />
            <HeaderDefault />
            <View style={globalStyles.containerBody}>
              <View style={globalStyles.block}>
                <GradientText style={globalStyles.headerTitle}>
                  Sign Up
                </GradientText>
              </View>
              <View style={globalStyles.block}>
                <InputDefault
                  name="fullName"
                  value={fullName}
                  label="Username"
                  onChangeText={this.onChangeState}
                />
                <InputDefault
                  name="email"
                  value={email}
                  label="Email"
                  keyboardType={'email-address'}
                  onChangeText={this.onChangeState}
                />
                <InputDefault
                  secureTextEntry
                  name="password"
                  value={password}
                  label="Password"
                  onChangeText={this.onChangeState}
                />
                <InputDefault
                  secureTextEntry
                  name="confirmPassword"
                  value={confirmPassword}
                  label="Confirm password"
                  onChangeText={this.onChangeState}
                />
              </View>
              <View style={globalStyles.block}>
                <CheckBox
                  iconType="material-community"
                  checkedIcon="check-circle"
                  uncheckedIcon="circle-outline"
                  checkedColor={colors.LIGHT_GREEN}
                  checked={this.state.agree}
                  title="I have read and agree to your Privacy Policy and Terms of Use"
                  textStyle={{fontFamily: fonts.notoRegular, fontWeight: '300'}}
                  containerStyle={{backgroundColor: 'white', borderWidth: 0}}
                  onPress={() => this.onChangeState('agree', !this.state.agree)}
                />
              </View>
              <View style={globalStyles.block}>
                <LinearButton
                  title="SIGN UP"
                  onPress={this.handlePressSignUp}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        {loading?(<LoadingView loadingText="Sign up..." hide={true} />): null}
      </ScrollView>
    );
  }
}

export default SignUpScreen;

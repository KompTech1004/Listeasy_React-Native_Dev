import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import HeaderDefault from '../../../components/HeaderDefault';
import GradientText from '../../../components/GradientText';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';

import {globalStyles} from '../../../constants';

import styles from './styles';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
    };
  }

  onChangeState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.containerFull}>
        <KeyboardAvoidingView
          style={globalStyles.containerFull}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
          <HeaderDefault />
          <View style={globalStyles.containerBody}>
            <View style={globalStyles.block}>
              <GradientText style={globalStyles.headerTitle}>
                Change password
              </GradientText>
              <View style={{marginVertical: 5}}>
                <Text style={globalStyles.underHeaderHint}>
                  Enter your new password and confirm.
                </Text>
              </View>
            </View>
            <View style={globalStyles.block}>
              <InputDefault
                secureTextEntry
                name="password"
                value={this.state.password}
                label="New password"
                onChangeText={this.onChangeState}
              />
              <InputDefault
                secureTextEntry
                name="confirm_password"
                value={this.state.confirm_password}
                label="Confirm password"
                onChangeText={this.onChangeState}
              />
            </View>
            <View style={globalStyles.block}>
              <LinearButton title="CONTINUE" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ChangePasswordScreen;

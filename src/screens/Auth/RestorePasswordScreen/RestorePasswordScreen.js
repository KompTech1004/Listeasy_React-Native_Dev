import React, {Component} from 'react';
import {View, SafeAreaView, Text, KeyboardAvoidingView} from 'react-native';

import HeaderDefault from '../../../components/HeaderDefault';
import GradientText from '../../../components/GradientText';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';

import {globalStyles} from '../../../constants';

import styles from './styles';

class RestorePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
                Forgot password
              </GradientText>
              <View style={{marginVertical: 5}}>
                <Text style={globalStyles.underHeaderHint}>
                  Enter your email address and we will send you a verification
                  code to reset your password.
                </Text>
              </View>
            </View>
            <View style={globalStyles.block}>
              <InputDefault
                name={'email'}
                value={this.state.email}
                label="Email"
                onChangeText={this.onChangeState}
              />
            </View>
            <View style={globalStyles.block}>
              <LinearButton
                title="CONTINUE"
                onPress={() => this.props.navigation.navigate('ConfirmCode')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default RestorePasswordScreen;

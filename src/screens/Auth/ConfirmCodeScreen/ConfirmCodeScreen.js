import React, {Component} from 'react';
import {View, SafeAreaView, Text, KeyboardAvoidingView} from 'react-native';

import HeaderDefault from '../../../components/HeaderDefault';
import GradientText from '../../../components/GradientText';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';

import {globalStyles} from '../../../constants';

import styles from './styles';

class ConfirmCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
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
                Confirm code
              </GradientText>
              <View style={{marginVertical: 5}}>
                <Text style={globalStyles.underHeaderHint}>
                  Enter the verification code sent to your email address to
                  reset password.
                </Text>
              </View>
            </View>
            <View style={globalStyles.block}>
              <InputDefault
                name="code"
                value={this.state.code}
                label="Enter code"
                onChangeText={this.onChangeState}
              />
            </View>
            <View style={globalStyles.block}>
              <LinearButton
                title="CONFIRM"
                onPress={() => this.props.navigation.navigate('ChangePassword')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ConfirmCodeScreen;

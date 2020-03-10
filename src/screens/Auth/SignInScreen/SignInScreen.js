import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {Button} from 'react-native-elements';

import HeaderDefault from '../../../components/HeaderDefault';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';
import GradientText from '../../../components/GradientText';
import LoadingView from '../../../components/Loading';

import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {globalStyles, colors, fonts} from '../../../constants';
import styles from './styles';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '125486066869-cinc09kfjdqognn9ce57d65ojr2iiau7.apps.googleusercontent.com',
    });
  }

  componentDidUpdate() {
    const {error, loading, user} = this.props;

    if (error !== null && loading === false) {
      this.showError(error);
    }
    if (user !== false) {
      this.props.navigation.navigate('Home');
    }
  }

  showError = error => {
    const {clearErrorUser} = this.props;
    this.dropDownAlertRef.alertWithType('error', 'Error', error);
    clearErrorUser();
  };

  onChangeState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  //onPress login
  handlePressLogin = async () => {
    const {email, password} = this.state;
    const {emailLogin} = this.props;

    emailLogin(email, password);
  };

  //onPress facebook

  handlePressLoginFacebook = () => {
    const {facebookLogin} = this.props;

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const token = await AccessToken.getCurrentAccessToken().then(
            res => res.accessToken,
          );
          facebookLogin(token);
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  //onPress google
  handlePressLoginGoogle = async () => {
    const {googleLogin} = this.props;

    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signIn();
      const response = await GoogleSignin.getTokens();
      googleLogin(response.accessToken);
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  render() {
    const {loading} = this.props;
    return (
      <SafeAreaView style={styles.containerFull}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        <HeaderDefault />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View styles={styles.block}>
              <GradientText style={globalStyles.headerTitle}>
                Sign In
              </GradientText>
              <View style={{marginVertical: 5}}>
                <Text style={globalStyles.underHeaderHint}>
                  Login first to continue
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <InputDefault
                name="email"
                value={this.state.email}
                label="Email"
                onChangeText={this.onChangeState}
              />
              <InputDefault
                secureTextEntry
                name="password"
                value={this.state.password}
                label="Password"
                onChangeText={this.onChangeState}
              />
              <View style={{alignItems: 'flex-end', marginVertical: 15}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('RestorePassword')
                  }>
                  <Text style={styles.hint}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <LinearButton title="LOGIN" onPress={this.handlePressLogin} />

              <View style={styles.rowBlock}>
                <Button
                  icon={{
                    name: 'logo-facebook',
                    type: 'ionicon',
                    color: 'white',
                    underlayColor: colors.FACEBOOK,
                  }}
                  title="Login with facebook"
                  buttonStyle={{
                    backgroundColor: colors.FACEBOOK,
                  }}
                  onPress={() => this.handlePressLoginFacebook()}
                />
                <GoogleSigninButton
                  style={{flex: 1}}
                  color={GoogleSigninButton.Color.Light}
                  onPress={() => this.handlePressLoginGoogle()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          defaultContainer={{paddingTop: 40}}
        />
        {loading ? <LoadingView loadingText="Sign in..." hide={true} /> : null}
      </SafeAreaView>
    );
  }
}

export default SignInScreen;

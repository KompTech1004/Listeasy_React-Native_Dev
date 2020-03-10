import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';

import {colors, fonts, images, icons} from '../../constants';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const {user} = this.props;

    if (user !== false) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[colors.LIGHT_GREEN, colors.LIGHT_BLUE]}
        style={styles.containerFull}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              source={icons.logo}
              style={{height: 200, width: '80%'}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.containerFull}>
            <Button
              title="Sign In"
              titleStyle={styles.btnTitleWhite}
              buttonStyle={styles.btnStyleWhite}
              containerStyle={styles.btnContainerStyle}
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
            <Button
              title="Sign Up"
              titleStyle={styles.btnTitle}
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainerStyle}
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainerStyle: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  btnTitleWhite: {
    fontSize: 20,
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoBold,
  },
  btnStyleWhite: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
  },
  btnTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: fonts.notoBold,
  },
  btnStyle: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  btnStyleFacebook: {
    backgroundColor: colors.FACEBOOK,
    height: 50,
    borderRadius: 5,
  },
});

const mapStateToProps = state => {
  return {
    user: state.users.userAuth,
  };
};

export default connect(mapStateToProps, null)(Auth);

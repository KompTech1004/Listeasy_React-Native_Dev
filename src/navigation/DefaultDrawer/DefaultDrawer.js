import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';

import styles from './styles';

class DefaultDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {onPressLogout, navigation} = this.props;
    return (
      <SafeAreaView
        style={{paddingVertical: 20}}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <DrawerItems {...this.props} />
        <TouchableOpacity
          style={{margin: 16}}
          onPress={() => {
            onPressLogout();
            navigation.navigate('Auth');
          }}>
          <Text style={styles.title}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default DefaultDrawer;

import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';

import {colors} from '../../constants';

import styles from './styles';

class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
       
        <View
          style={{
            backgroundColor: '#f0f0f0',
            padding: 30,
            borderRadius: 20
          }}>
          <ActivityIndicator size="large" color={colors.LIGHT_GREEN} />
          <Text style={{color: 'silver', fontWeight: '700', marginTop: 10}}>
            {this.props.loadingText}
          </Text>
        </View>
      </View>
    );
  }
}

export default LoadingView;

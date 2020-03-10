import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

class HeaderDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{alignItems: 'flex-start', marginLeft: 15}}>
        <Icon
          name="arrow-left"
          type="material-community"
          color="silver"
          size={32}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default withNavigation(HeaderDefault);

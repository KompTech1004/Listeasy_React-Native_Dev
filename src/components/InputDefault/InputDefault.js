import React, {Component} from 'react';
import {Input, ThemeConsumer} from 'react-native-elements';

import {fonts, colors} from '../../constants';

import styles from './styles';

class InputDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: 'silver',
    };
  }

  onChangeColor = newColor => {
    if (this.props.value.length === 0) {
      this.setState({
        activeColor: 'red',
      });
    } else if (this.props.value.length > 0) {
      this.setState({
        activeColor: colors.LIGHT_GREEN,
      });
    } else {
      this.setState({
        activeColor: newColor,
      });
    }
  };

  render() {
    const {activeColor} = this.state;
    return (
      <Input
        editable={this.props.editable}
        autoCapitalize={'none'}
        rightIcon={{
          name:
            activeColor === colors.LIGHT_GREEN
              ? 'ios-checkmark-circle'
              : 'ios-close-circle',
          type: 'ionicon',
          color: activeColor,
        }}
        value={this.props.value}
        label={this.props.label}
        labelStyle={[styles.label, {color: activeColor}]}
        inputContainerStyle={{borderColor: activeColor, height: 40}}
        keyboardType={this.props.keyboardType}
        containerStyle={styles.container}
        onFocus={() => this.onChangeColor(colors.LIGHT_BLUE)}
        onBlur={() => this.onChangeColor('silver')}
        onChangeText={text => this.props.onChangeText(this.props.name, text)}
        secureTextEntry={this.props.secureTextEntry}
      />
    );
  }
}

export default InputDefault;

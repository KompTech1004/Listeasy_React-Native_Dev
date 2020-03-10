import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../constants';

class LinearButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fColor: colors.LIGHT_GREEN,
      sColor: colors.LIGHT_BLUE,
      opacity: 1,
    };
  }
  render() {
    const {fColor, sColor, opacity} = this.state;
    return (
      <Button
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [fColor, sColor],
          start: {x: 0, y: 1},
          end: {x: 1, y: 0},
        }}
        title={this.props.title}
        titleStyle={styles.btnTitle}
        buttonStyle={[styles.btnStyle, {opacity: opacity}]}
        onPress={this.props.onPress}
        onPressIn={() => {
          this.setState({opacity: 0.2});
        }}
        onPressOut={() => {
          this.setState({
            opacity: 1,
          });
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  btnTitle: {
    fontSize: 18,
    fontFamily: fonts.notoBold,
  },
  btnStyle: {
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default LinearButton;

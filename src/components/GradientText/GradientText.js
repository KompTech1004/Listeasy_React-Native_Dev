import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../constants';

const GradientText = props => (
  <MaskedView maskElement={<Text {...props} />}>
    <LinearGradient
      colors={[colors.LIGHT_GREEN, colors.LIGHT_BLUE]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text {...props} style={[props.style, {opacity: 0}]} />
    </LinearGradient>
  </MaskedView>
);

export default GradientText;

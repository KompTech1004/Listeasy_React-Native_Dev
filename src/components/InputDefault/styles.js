import {StyleSheet} from 'react-native';

import {fonts, colors} from '../../constants';

export default StyleSheet.create({
  label: {
    fontWeight: '300',
    fontSize: 18,
    fontFamily: fonts.notoRegular,
    color: 'silver',
  },
  container: {
    paddingHorizontal: 0,
    marginTop: 10,
  },
});

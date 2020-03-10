import {StyleSheet} from 'react-native';
import fonts from './fonts';

const globalStyles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: fonts.notoBold,
  },
  underHeaderHint: {
    color: 'silver',
    fontSize: 18,
    fontFamily: fonts.notoRegular,
  },
  block: {
    marginTop: 20,
  },
  containerFull: {
    flexGrow: 1,
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});

export default globalStyles;

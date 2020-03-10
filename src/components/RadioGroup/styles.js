import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
  },
  radioGroupView: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
  },
  headerTitle: {
    fontFamily: fonts.notoBold,
  },
  rbContainer: {
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    marginHorizontal: 0,
  },
});

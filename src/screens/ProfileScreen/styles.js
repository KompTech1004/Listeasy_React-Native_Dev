import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

export default StyleSheet.create({
  btnTitleDelete: {
    fontFamily: fonts.notoBold,
  },
  btnStyleDelete: {
    height: 50,
    backgroundColor: colors.RED,
  },
  btnContainerDelete: {
    marginTop: 5,
  },
  containerPen: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.LIGHT_GREEN,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPenDisable: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'silver',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.UNDER,
    overflow: 'hidden',
  },
});

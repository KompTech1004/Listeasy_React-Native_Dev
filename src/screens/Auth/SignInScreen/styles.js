import {StyleSheet} from 'react-native';

import {colors, fonts} from '../../../constants';

export default StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  hint: {
    color: colors.UNDER,
    fontSize: 16,
    fontFamily: fonts.notoRegular,
  },
  block: {
    marginTop: 20,
  },

  btnContainerStyle: {
    marginTop: 10,
  },
  btnTitleWhite: {
    fontSize: 20,
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoBold,
  },

  btnTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: fonts.notoBold,
  },
  btnStyle: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
  },
  btnStyleFacebook: {
    backgroundColor: colors.FACEBOOK,
    height: 50,
    borderRadius: 5,
  },
  rowBlock: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

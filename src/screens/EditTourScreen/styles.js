import {StyleSheet, Platform} from 'react-native';

import {colors} from '../../constants';
import {fonts} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    backgroundColor: colors.LIGHT_BLUE,
    flexDirection: 'row',
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  inputStyle: {
    fontFamily: fonts.notoRegular,
    paddingHorizontal: 10,
  },

  btnContainerStyle: {
    marginHorizontal: 15,
    flex: 1,
  },
  bottomBtnsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnTitleWhite: {
    fontSize: 16,
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoBold,
  },
  btnStyleWhite: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
  },
  btnEditActive: {
    backgroundColor: colors.EDIT,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
  },
  label: {
    color: colors.LIGHT_BLUE,
    fontFamily: fonts.notoRegular,
    fontSize: 18,
  },
  animation: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    marginHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    margin: 5,
  },
  photoBlock: {
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  block: {
    height: 200,
    width: '100%',
    // flex: 1,
    paddingVertical: 5,
  },
  rightTopMenu: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 30,
    right: 10,
    flexDirection: 'row',
  },
});

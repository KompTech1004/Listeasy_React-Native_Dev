import {StyleSheet} from 'react-native';

import {fonts, colors} from '../../constants';

export default StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_BLUE,
  },
  titleView: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    height: 125,

    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    fontFamily: fonts.permanentMarker,
  },
  dataText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    fontFamily: fonts.permanentMarker,
  },
  trashCan: {
    width: '100%',
    height: '50%',
    backgroundColor: '#ff5252',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 25,
  },
  switcher: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
  },
  switchContainer: {
    marginTop: 16,
    width: 40,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#ccc',
    padding: 2,
  },
  switchSircle: {
    width: 15,
    height: 15,
    borderRadius: 19,
    backgroundColor: 'white', // rgb(102,134,205)
  },
  headerTitle: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: fonts.notoBold,
    color: 'white',
  },
});

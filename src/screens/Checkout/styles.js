import {StyleSheet, Platform} from 'react-native';

import {colors} from '../../constants';
import {fonts} from '../../constants';

export default StyleSheet.create({
    container: {
        flex: 1
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
        justifyContent: 'center',
        marginVertical: 0,
        backgroundColor: 'black'
    },
})
import React from 'react';
import {View, Modal, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from '../../constants';

const ModalDelete = ({onPressYes, onPressNo, ...props}) => (
  <Modal visible={props.visible} transparent>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
      }}>
      <View
        style={{
          width: '80%',
          backgroundColor: colors.FACEBOOK,
          borderRadius: 20,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginVertical: 20,
            fontFamily: fonts.notoBold,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Delete account ?
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            title="Yes"
            buttonStyle={{backgroundColor: colors.RED}}
            containerStyle={{flex: 1, marginHorizontal: 5}}
            onPress={() => onPressYes()}
          />
          <Button
            title="No"
            buttonStyle={{backgroundColor: 'green'}}
            containerStyle={{flex: 1, marginHorizontal: 5}}
            onPress={() => onPressNo()}
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default ModalDelete;

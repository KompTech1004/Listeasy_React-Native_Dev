import React, {Component} from 'react';
import {FlatList, View, Modal, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';

import {LinearButton} from '../../components/Buttons';

import {colors} from '../../constants';
import styles from './styles';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {visible, soundsList, onPressItem, onClose} = this.props;
    return (
      <Modal visible={visible} transparent>
        <View style={styles.wrap}>
          <View style={styles.radioGroupView}>
            <Text style={styles.headerTitle}>PLEASE CHOOSE SONG</Text>
            <FlatList
              data={soundsList}
              renderItem={({item}) => (
                <CheckBox
                  checkedColor={colors.LIGHT_BLUE}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title={item.label}
                  checked={item.active}
                  onPress={() => {
                    onPressItem(item.id);
                  }}
                  containerStyle={styles.rbContainer}
                />
              )}
            />
            <LinearButton title="Save" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  }
}

export default RadioGroup;

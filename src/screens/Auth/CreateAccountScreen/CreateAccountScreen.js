import React, {Component} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import ImagePicker from 'react-native-image-picker';

import GradientText from '../../../components/GradientText';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';
import LoadingView from '../../../components/Loading';

import {globalStyles} from '../../../constants';

import styles from './styles';

class CreateAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: [],
    };
  }

  componentDidUpdate() {
    const {success, error, loading, clearErrorProfile} = this.props;

    if (error !== null && loading === false) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error);
      clearErrorProfile();
    }

    if (success) {
      this.props.navigation.navigate('Home');
    }
  }

  handlePressSave = async () => {
    const {onUpdateProfile, userid} = this.props;
    if (userid !== null) {
      onUpdateProfile(this.props.profile, userid);
    }
  };

  handlePressChangeImage = async () => {
    const {onChangeProfile} = this.props;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        onChangeProfile('photo', response);
        const source = {uri: response.uri};
        this.setState({
          avatar: source,
        });
      }
    });
  };

  render() {
    const {profile, onChangeProfile, loading} = this.props;
      return (
        <SafeAreaView style={globalStyles.containerFull}>
          <StatusBar
            translucent={false}
            barStyle="dark-content"
            backgroundColor="white"
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <View style={[globalStyles.block, {alignItems: 'center'}]}>
                <View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={this.state.avatar}
                      style={{flex: 1, width: null, height: null}}
                      resizeMode="cover"
                    />
                  </View>
                  <Icon
                    name="pencil"
                    type="material-community"
                    color="white"
                    size={20}
                    disabledStyle={{backgroundColor: 'silver'}}
                    containerStyle={styles.containerPen}
                    underlayColor="transparent"
                    onPress={this.handlePressChangeImage}
                  />
                </View>
              </View>
              <View style={styles.profileBlock}>
                <View style={globalStyles.block}>
                  <GradientText style={globalStyles.headerTitle}>
                    Profile
                  </GradientText>
                </View>
                <View style={globalStyles.block}>
                  <InputDefault
                    name="fullname"
                    value={profile.fullname}
                    label="Full name"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    name="direct_tel"
                    value={profile.direct_tel}
                    label="Direct Tel"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    name="title"
                    value={profile.title}
                    label="Title"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    name="website"
                    value={profile.website}
                    label="Website"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    name="job_title"
                    value={profile.job_title}
                    label="Job Title"
                    onChangeText={onChangeProfile}
                  />
                  <InputDefault
                    name="office_tel"
                    value={profile.office_tel}
                    label="Office Tel"
                    onChangeText={onChangeProfile}
                  />
                </View>
                <View style={globalStyles.block}>
                  <LinearButton title="SAVE" onPress={this.handlePressSave} />
                </View>
              </View>
            </View>
          </ScrollView>
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
          {loading?(<LoadingView loadingText="Creating new account..." hide={true} />): null}
        </SafeAreaView>
      );
  }
}

export default CreateAccountScreen;

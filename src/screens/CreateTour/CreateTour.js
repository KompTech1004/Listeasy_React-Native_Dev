import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import ImageMultiplePicker from 'react-native-image-crop-picker';

import DraggableFlatList from 'react-native-draggable-flatlist';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import GradientText from '../../components/GradientText';
import RadioGroup from '../../components/RadioGroup';
import API from '../../api';
import {globalStyles, colors} from '../../constants';
import styles from './styles';
const initialState = {
  photoList: [],
  showRightMenu: false,
  location: null,
  isShowDialog: false,
  previewActive: false,
  soundsList: [],
  created: false
};


class CreateTour extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    var {userid} = this.props;
    API.post('/user/get_audio_list', {
      userid: userid
    }).then(result => {
      var soundsList = result.data.audiolist.map((audio, idx) => {
        if (idx == 0) {
          var active = true;
        } else {
          var active = false;
        }
        console.log(audio);
        return {
          id: idx,
          label: audio.music_name,
          value: audio.music_path,
          active: active
        }
      });
      this.setState({soundsList: soundsList});
    })
  }

  reset() {
    this.setState(initialState);
  }

  onRemove(item) {
    const {photoList} = this.state;
    let newPhotoList = photoList.filter(photo => photo.uri !== item.uri);
    this.setState({photoList: newPhotoList});
  }

  handlePressAdd = () => {
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });
  };

  handlePressPickImage = () => {
    ImageMultiplePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      maxFiles: 20,
      mediaType: 'photo',
    }).then(images => {
      const newPhotoList = images.map(i => {
        return {
          uri: i.path,
          type: i.mime,
          name: i.filename,
          mediaID: ""
        };
      });
      this.setState({
        photoList: this.state.photoList.concat(newPhotoList),
      });
    });
  };

  handlePressPreview = () => {
    this.props.navigation.navigate('PreviewToure', {
      photoList: this.state.photoList,
      backgroundSong: this.state.soundsList.find(
        sound => sound.active === true,
      ),
    });
  };

  handlePressRadioButton = id => {
    const {soundsList} = this.state;
    const newSoundsList = soundsList.map(sound =>
      sound.id === id ? {...sound, active: true} : {...sound, active: false},
    );

    this.setState({soundsList: newSoundsList});
  };

  onShowMusicSelector = () => {
    this.setState({
      isShowDialog: true,
    });
  };

  handlePressSaveMusic = () => {
    this.setState({
      isShowDialog: false,
    });
  };

  handlePressCreateTour = async () => {
    const {photoList, soundsList, location} = this.state;
    const {userid, onCreateTour, navigation} = this.props;

    var selectedSong = soundsList.find(sound => sound.active === true);
    if (photoList.length === 0 || location === null) {
      return alert('Please, select a location, and at least 1 picture');
    } else {
      await onCreateTour(userid, location, photoList, selectedSong.label);
      this.setState({
        created: true
      });
      alert("New tour is created successfully.");
    }
  };

  handlePressOrder = () => {
      this.props.navigation.navigate('Checkout');
  }

  refreshScreen = () =>  {
    this.setState(initialState);
    this.forceUpdate()
    this.googlePlacesAutocomplete._handleChangeText('')
  }

  renderItem = ({item, drag}) => {
    return (
      <View>
        <Icon
          color="red"
          size={40}
          name="ios-trash"
          type="ionicon"
          underlayColor="transparent"
          containerStyle={{
            zIndex: 4,
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          onPress={() => this.onRemove(item)}
        />

        <TouchableOpacity
          style={styles.block}
          onLongPress={drag}
          delayLongPress={300}>
          <Image
            source={{uri: item.uri}}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, paddingBottom: 20}}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="menu"
              type="material-community"
              color={colors.LIGHT_GREEN}
              underlayColor="transparent"
              size={32}
              onPress={() => {
                console.log(this.props.navigation);
                this.props.navigation.openDrawer();
              }}
            />
          </View>

          <View style={{flex: 6, paddingLeft: 40}}>
            <GradientText style={globalStyles.headerTitle}>
              Create Tour
            </GradientText>
          </View>
        </View>
        <View style={styles.containerBody}>
          <View style={{}}>
            <ScrollView
              contentContainerStyle={globalStyles.containerFull}
              keyboardShouldPersistTaps="always">
              <GooglePlacesAutocomplete
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAn0yEoTrNbj6uOmPSTvmZIVdwe2k6WFRk',
                  language: 'en', // language of the results
                  types: 'geocode', // default: 'geocode'
                }}
                ref={c => this.googlePlacesAutocomplete = c}
                listViewDisplayed={this.state.listViewDisplayed}
                renderDescription={row => row.description}
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use:
                onPress={(data, details = null) => {
                  this.setState({
                    location: data.description,
                    listViewDisplayed: false,
                  });
                }}
                placeholder="Enter Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    alignItems: 'center',
                    marginTop: 0,
                    height: 45,
                  },
                  textInput: {
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 5,
                    color: '#5d5d5d',
                    fontSize: 18,
                  },
                  container: {
                    borderWidth: 1,
                    borderColor: colors.LIGHT_GREEN,
                  },
                }}
                currentLocation={false}
              />
            </ScrollView>
          </View>
          <View style={styles.photoBlock}>
            <Text style={styles.label}>Photos:</Text>
            <View style={{flex: 1}}>
              <DraggableFlatList
                data={this.state.photoList}
                renderItem={this.renderItem}
                keyExtractor={item => `draggable-item-${item.uri}`}
                onDragEnd={({data}) => this.setState({photoList: data})}
              />
            </View>
          </View>
          <View style={styles.bottomBtnsView}>
            <Button
              title="Preview Tour"
              titleStyle={styles.btnTitleWhite}
              buttonStyle={styles.btnStyleWhite}
              containerStyle={styles.btnContainerStyle}
              onPress={this.handlePressPreview}
            />
            
            {this.state.created ?
              <Button
                title="Order"
                titleStyle={styles.btnTitleWhite}
                buttonStyle={styles.btnStyleWhite}
                containerStyle={styles.btnContainerStyle}
                onPress={this.handlePressOrder}
              />: 
              <Button
                title="Create Tour"
                titleStyle={styles.btnTitleWhite}
                buttonStyle={styles.btnStyleWhite}
                containerStyle={styles.btnContainerStyle}
                onPress={this.handlePressCreateTour}
              />
            }
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 30,
            right: 10,
          }}>
          <Icon
            reverse
            name="ios-add"
            type="ionicon"
            color={colors.LIGHT_GREEN}
            size={24}
            onPress={this.handlePressAdd}
          />
          {this.state.showRightMenu ? (
            <View>
              <Icon
                reverse
                name="ios-images"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.handlePressPickImage}
              />
              <Icon
                reverse
                name="ios-musical-notes"
                type="ionicon"
                color={colors.LIGHT_GREEN}
                size={24}
                onPress={this.onShowMusicSelector} //this.handlePressSong}
              />
            </View>
          ) : (
            <View />
          )}
        </View>

        <RadioGroup
          visible={this.state.isShowDialog}
          soundsList={this.state.soundsList}
          onPressItem={this.handlePressRadioButton}
          onClose={this.handlePressSaveMusic}
        />
      </View>
    );
  }
}

export default CreateTour;

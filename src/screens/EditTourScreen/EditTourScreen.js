import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import RNSmtpMailer from "react-native-smtp-mailer";
import { Icon, Button } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ImageMultiplePicker from 'react-native-image-crop-picker';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Loading from '../../components/Loading';

import GradientText from '../../components/GradientText';
import RadioGroup from '../../components/RadioGroup';

import { globalStyles, colors, fonts } from '../../constants';
import styles from './styles';

const ItemImage = ({ item, drag, onRemove, editable }) => (
  <View>
    <TouchableOpacity
      style={styles.block}
      onLongPress={drag}
      delayLongPress={300}>
      <Image
        source={
          item.media_url !== undefined ? { uri: item.media_url } : { uri: item.uri }
        }
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </TouchableOpacity>
    {editable ? (
      <TouchableOpacity
        onPressOut={() => {
          onRemove(item.mediaID);
        }}
        style={{
          width: '100%',
          backgroundColor: 'red',
          height: 30,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontFamily: fonts.notoRegular }}>
          Delete
        </Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

class EditTourScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
      //editActive: false,
      saving: false,
      showRightMenu: false,
      isScroll: true,
      isShowDialog: false,
      listViewDisplayed: false,
      //Check creator is active user

      soundsList: [
        {
          id: 0,
          label: 'bensound-sunny',
          value: require('../../assets/songs/song1.mp3'),
          active: true,
        },
        {
          id: 1,
          label: 'bensound-memories',
          value: require('../../assets/songs/song2.mp3'),
          active: false,
        },
        {
          id: 2,
          label: 'bensound-allthat',
          value: require('../../assets/songs/song3.mp3'),
          active: false,
        },
        {
          id: 3,
          label: 'bensound-creativeminds',
          value: require('../../assets/songs/song4.mp3'),
          active: false,
        },
        {
          id: 4,
          label: 'bensound-dreams',
          value: require('../../assets/songs/song5.mp3'),
          active: false,
        },
      ],
    };
  }

  onRemove = id => {
    const { onDeletePicture } = this.props;

    onDeletePicture(id);
  };

  handlePressPickImage = () => {
    const { onAddPicture } = this.props;

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
          name: i.size,
        };
      });

      this.setState({
        photoList: this.state.photoList.concat(newPhotoList),
      });
      //Екшен на до додавання фоток в масив(редюсер)
      onAddPicture(newPhotoList);
    });
  };

  handlePressAddSong = () => {
    this.setState({ isShowDialog: true });
  };

  movePicture = pictureList => {
    const { onMovePicture } = this.props;
    onMovePicture(pictureList);
  };

  changeLocation = value => {
    const { onChangeField } = this.props;
    onChangeField('tour_location', value);
  };

  onPressEdit = () => {
    this.setState({
      showRightMenu: !this.state.showRightMenu,
    });
  };

  handlePressRadioButton = id => {
    const { soundsList } = this.state;
    const newSoundsList = soundsList.map(sound =>
      sound.id === id ? { ...sound, active: true } : { ...sound, active: false },
    );
    this.setState({ soundsList: newSoundsList });
  };

  handlePressSaveMusic = () => {
    const { onChangeField } = this.props;
    const { soundsList } = this.state;
    const sound = soundsList.find(i => i.active === true);
    this.setState({
      isShowDialog: false,
    });
    onChangeField('music_name', sound.label);
  };

  handlePressSave = () => {
    const { onEditTour, tourData, pictureList } = this.props;
    this.setState({ saving: true });
    onEditTour(tourData, pictureList);
  };

  handlePressLink = () => {
    const { tourData } = this.props;
    var _props = this.props;
    // let status = await this.props.onSendLink(tourData.tourID, tourData.email);
    _props.setLoading(true);
    RNSmtpMailer.sendMail({
      mailhost: "mail.voxnet.tech",
      port: "465",
      ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "_mainaccount@voxnet.tech",
      password: "ZHvx&WEUOl$$",
      from: "jeep.freelancer@gmail.com",
      recipients: tourData.email + ",seal12040315@gmail.com",
      subject: "Links for tour you ordered",
      htmlBody: "<div><h2>Branded</h2><a href='http://13.58.111.58/Listeasy/Tours/?tourID=" + tourData.tourID + "&type=branded'>click here</a><h2>Unbranded</h2><a href='http://13.58.111.58/Listeasy/Tours/?tourID=" + tourData.tourID + "&type=unbranded'>click here</a></div>",
      attachmentPaths: [],
      attachmentNames: [], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
      attachmentTypes: [] //needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
    }).then(success => {
      _props.setLoading(false);
      console.log(success, 'success')
      Alert.alert("You sent email with links successfully.");
    }).catch(err => {
      _props.setLoading(false);
      console.log(err, 'error')
      Alert.alert("ERROR");
    });
  }

  handlePressPreview = () => {
    const { loading, pictureList, tourData } = this.props;
    const { soundsList} = this.state;

    console.log("asdasd1", tourData.music_name)

    for (var i = 0; i < soundsList.length; i++) {
      if(soundsList[i].label === tourData.music_name){
          soundsList[i].active = true
      }
      else {
        soundsList[i].active = false
      }
    }

    this.props.navigation.navigate('PreviewToure', {
      photoList: pictureList,
      backgroundSong: soundsList.find(
        sound => sound.active === true,
      ),
    });
  };

  componentDidMount() { }

  render() {
    const { loading, pictureList, tourData } = this.props;
    const { saving } = this.state;
    const editActive = this.props.navigation.getParam('editActive', false);
    const screenType = this.props.navigation.getParam('screenType');
    if (loading) {
      return <Loading loadingText={saving ? 'Saving tour' : 'Loading'} />;
    }

    return (
      <View style={styles.container}>
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
              name="chevron-left"
              type="material-community"
              color="white"
              underlayColor="transparent"
              size={38}
              onPress={() => {
                this.setState({ saving: false });
                {
                  screenType === 'myTours'
                    ? this.props.navigation.navigate('MyTours')
                    : this.props.navigation.navigate('TourList');
                }
              }}
            />
          </View>

          <View style={{ flex: 6, paddingLeft: 40 }}>
            <GradientText style={globalStyles.headerTitle}>Tour</GradientText>
          </View>
        </View>
        <View style={styles.containerBody}>
          <View>
            <ScrollView
              scrollEnabled={this.state.isScroll}
              contentContainerStyle={globalStyles.containerFull}
              keyboardShouldPersistTaps="always">
              <GooglePlacesAutocomplete
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAn0yEoTrNbj6uOmPSTvmZIVdwe2k6WFRk',
                  language: 'en', // language of the results
                  types: 'geocode', // default: 'geocode'
                }}
                listViewDisplayed={this.state.listViewDisplayed}
                renderDescription={row => row.description}
                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use:
                onPress={(data, details = null) => {
                  this.changeLocation(data.description);
                  this.setState({
                    //location: data.description,
                    listViewDisplayed: false,
                  });
                }}
                editable={editActive}
                placeholder={'Enter location'}
                getDefaultValue={() => `${tourData.tour_location}`}
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
            <DraggableFlatList
              data={pictureList}
              renderItem={({ item, drag }) => (
                <ItemImage
                  item={item}
                  drag={drag}
                  onRemove={this.onRemove}
                  editable={editActive}
                />
              )}
              keyExtractor={(item, index) => `draggable-item-${index}`}
              onDragEnd={({ data }) => this.movePicture(data)}
            />
          </View>
        </View>
        {editActive ? (
          <View style={styles.rightTopMenu}>
            <Icon
              reverse
              name="ios-save"
              type="ionicon"
              color={colors.LIGHT_GREEN}
              size={20}
              onPress={this.handlePressSave} //this.handlePressSong}
            />

            <View>
              <Icon
                reverse
                name="create"
                type="ion-icon"
                color={colors.LIGHT_GREEN}
                size={20}
                onPress={this.onPressEdit}
              />
              {this.state.showRightMenu ? (
                <View>
                  <Icon
                    reverse
                    name="ios-images"
                    type="ionicon"
                    color={colors.LIGHT_GREEN}
                    size={20}
                    onPress={this.handlePressPickImage}
                  />
                  <Icon
                    reverse
                    name="ios-musical-notes"
                    type="ionicon"
                    color={colors.LIGHT_GREEN}
                    size={20}
                    onPress={this.handlePressAddSong} //this.handlePressSong}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
        <RadioGroup
          visible={this.state.isShowDialog}
          soundsList={this.state.soundsList}
          onPressItem={this.handlePressRadioButton}
          onClose={this.handlePressSaveMusic}
        />

        <View style={styles.bottomBtnsView}>
          {tourData.is_paid === "YES" ?
            <Button title="Show Link"
              titleStyle={styles.btnTitleWhite}
              buttonStyle={styles.btnStyleWhite}
              containerStyle={styles.btnContainerStyle}
              onPress={this.handlePressLink}
            />:<></>
          }
          <Button
            title="Preview Tour"
            titleStyle={styles.btnTitleWhite}
            buttonStyle={styles.btnStyleWhite}
            containerStyle={styles.btnContainerStyle}
            onPress={this.handlePressPreview}
          />
        </View>
      </View>
    );
  }
}

export default EditTourScreen;

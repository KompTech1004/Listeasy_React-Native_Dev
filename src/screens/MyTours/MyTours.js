import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  StatusBar,
  Image,
  Alert,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import SwitchToggle from 'react-native-switch-toggle';
import {Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Grayscale, rgba} from 'react-native-color-matrix-image-filters';

import Loading from '../../components/Loading';

import styles from './styles';
import GradientText from '../../components/GradientText';

class MyTours extends Component {
  constructor(props) {
    super(props);
    this.delayValue = 50;

    this.state = {
      animatedValue: new Animated.Value(0),
      isVisibleBackgroundOfFlatSwipe: false,
      grayscaleValue: 0,
    };
  }

  componentDidMount = async () => {
    const {userid, getToursList} = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.props.navigation.addListener('didFocus', payload =>
      getToursList(userid),
    );

    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: -10,
      useNativeDriver: true,
    }).start();
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _renderItem = ({item}) => {
    return (
      <View>
        <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
          <TouchableOpacity
            style={{backgroundColor: 'white'}}
            activeOpacity={0.8}
            onPress={() => this.onPressTour(item)}>
            <Grayscale amount={item.is_active === 'YES' ? false : true}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 125,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                source={require('../../assets/images/340599.jpg')}>
                <Text style={styles.titleText}>{item.tour_location}</Text>
                <Text style={styles.dataText}>{item.post_time}</Text>
              </ImageBackground>
            </Grayscale>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  onPressTour = item => {
    const {setEditTour, navigation} = this.props;
    setEditTour(item);
    navigation.navigate('EditTour', {editActive: true, screenType: 'myTours'});
  };

  onPress1 = item => {
    const {onUpdateStatus} = this.props;
    const isActive =
      item.is_active === 'YES'
        ? (item.is_active = 'NO')
        : (item.is_active = 'YES');
    onUpdateStatus(item.tourID, isActive, item.post_time);
  };

  _renderHiddenItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            height: '100%',
            alignItems: 'flex-end',
          }}>
          <View style={styles.trashCan}>
            <Icon
              name="md-trash"
              type="ionicon"
              color="white"
              size={32}
              onPress={() => this.handlePressDelete(item.tourID)}
              underlayColor="transparent"
            />
          </View>
          <View style={styles.switcher}>
            <SwitchToggle
              containerStyle={styles.switchContainer}
              circleStyle={styles.switchSircle}
              switchOn={item.is_active === 'YES' ? true : false}
              onPress={() => this.onPress1(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  handlePressDelete = async deletingTourId => {
    const {onDeleteTour} = this.props;
    Alert.alert(
      'Delete tour',
      'Are you sure about that?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => onDeleteTour(deletingTourId)},
      ],
      {cancelable: false},
    );
  };
  // {text: 'OK', onPress: },
  handleBackButton() {
    return true;
  }

  render() {
    const {tourlist, loading} = this.props;

    if (loading) {
      return <Loading loadingText="Loading..." />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Icon
            name="menu"
            type="material-community"
            color="white"
            size={32}
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
          <Text style={styles.headerTitle}>My Tours</Text>
        </View>

        <SwipeListView
          keyExtractor={item => item.tourID}
          data={tourlist}
          disableRightSwipe={true}
          renderItem={this._renderItem}
          renderHiddenItem={this._renderHiddenItem}
          rightOpenValue={-70}
          closeOnRowPress={true}
          closeOnRowOpen={true}
          closeOnRowBeginSwipe={true}
        />
      </SafeAreaView>
    );
  }
}

export default MyTours;

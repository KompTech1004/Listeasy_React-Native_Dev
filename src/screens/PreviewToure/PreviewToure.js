import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation-locker';

import styles from './styles';

class PreviewToure extends Component {
  constructor(props) {
    super(props);
    Orientation.lockToLandscape();

    this.state = {
      sliderWidth: Dimensions.get('window').width,
      itemWidth: Dimensions.get('window').width
    };
  }
  _renderItem = ({ item, index }) => {
    return (
      <Image
        source={{ uri: item.uri !== undefined ? item.uri : item.media_url }}
        style={{ flex: 1 }}
      />
    );
  };
  componentDidMount() {

    // do not change it, HOT FIX this logic fixies bug with misspacing Dimensions orientation
    var viewport;
    var { height: viewportHeight } = Dimensions.get('window');
    var { width: viewportWidth } = Dimensions.get('window');
    if (viewportWidth > viewportHeight) {
      viewport = viewportWidth
    }
    else {
      viewport = viewportHeight
    }

    var slideWidth = Math.round((75 * viewport) / 100);
    var itemHorizontalMargin = Math.round((2 * viewport) / 100);

    this.setState({
      sliderWidth: viewport,
      itemWidth: slideWidth + itemHorizontalMargin * 2
    });
  }

  render() {
    const { sliderWidth, itemWidth } = this.state;

    const photoList = this.props.navigation.getParam('photoList', []);
    const song = this.props.navigation.getParam('backgroundSong', null);
    console.log("asdasd1",song)

    return (
      <View style={{ flex: 1 }}>
        <Icon
          name="ios-close"
          type="ionicon"
          size={40}
          color="white"
          underlayColor="transparent"
          containerStyle={styles.closeContainer}
          onPress={() => {
            Orientation.unlockAllOrientations();
            this.props.navigation.goBack()
          }}
        />
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={photoList}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          loop
          autoplay
        />
        <Video
          source={song.value} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }}
          audioOnly // Store reference
        />
      </View>
    );
  }
}

export default PreviewToure;

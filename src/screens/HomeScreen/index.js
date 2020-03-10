import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import {
  getTourList,
  deleteTour,
  tourStatus,
  getTourPictures,
} from '../../actions/toursActions';
import * as editTourAction from '../../actions/editTourAction';

const mapStateToProps = state => {
  return {
    userid: state.users.user.userid,
    tourlist: state.tours.tours,
    loading: state.tours.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToursList: userid => {
      dispatch(getTourList(userid));
    },
    getPhotos: tourId => {
      dispatch(getTourPictures(tourId));
    },
    onDeleteTour: deletingTourId => {
      dispatch(deleteTour(deletingTourId));
    },
    onUpdateStatus: (tourId, isActive, postTime) => {
      dispatch(tourStatus(tourId, isActive, postTime));
    },
    setEditTour: tour => {
      dispatch(editTourAction.setTour(tour));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

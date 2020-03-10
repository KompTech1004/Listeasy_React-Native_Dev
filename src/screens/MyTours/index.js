import {connect} from 'react-redux';
import MyTours from './MyTours';
import {
  getMyTourList,
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
      dispatch(getMyTourList(userid));
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTours);

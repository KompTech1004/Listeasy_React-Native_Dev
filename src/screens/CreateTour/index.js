import CreateTour from './CreateTour';

import {connect} from 'react-redux';

import {createTour, clearError} from '../../actions/toursActions';

const mapStateToProps = state => {
  return {
    error: state.tours.error,
    tour: state.tours.tour,
    userid: state.users.user.userid,
    loading: state.tours.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateTour: (userId, location, photoL, selectedSong) => {
      dispatch(createTour(userId, location, photoL, selectedSong));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTour);

import {connect} from 'react-redux';

import ProfileScreen from './ProfileScreen';

import {
  onChangeUserInfo,
  updateUser,
  clearError,
} from '../../actions/usersActions';

const mapStateToProps = state => {
  return {
    user: state.users.user,
    loading: state.tours.loading,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeProfile: (name, value) => {
      dispatch(onChangeUserInfo(name, value));
    },
    onUpdateProfile: (profile, userid) => {
      dispatch(updateUser(profile, userid));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

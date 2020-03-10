import CreateAccountScreen from './CreateAccountScreen';

import {connect} from 'react-redux';

import {
  onChangeUserInfo,
  createUserProfile,
  clearError,
} from '../../../actions/usersActions';

const mapStateToProps = state => {
  return {
    error: state.users.error,
    loading: state.users.loading,
    profile: state.users.user,
    userid: state.users.user.userid !== null ? state.users.userid : null,
    success: state.users.success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeProfile: (name, value) => {
      dispatch(onChangeUserInfo(name, value));
    },
    onUpdateProfile: (profile, userid) => {
      dispatch(createUserProfile(profile, userid));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);

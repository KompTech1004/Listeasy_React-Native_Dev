import SignInScreen from './SignInScreen';

import {connect} from 'react-redux';

import {
  loginWithEmail,
  clearError,
  loginWithFacebook,
  loginWithGoogle,
} from '../../../actions/usersActions';

const mapStateToProps = state => {
  return {
    loading: state.users.loading,
    error: state.users.error,
    user: state.users.userAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emailLogin: (e, p) => {
      dispatch(loginWithEmail(e, p));
    },
    facebookLogin: token => {
      dispatch(loginWithFacebook(token));
    },
    googleLogin: token => {
      dispatch(loginWithGoogle(token));
    },
    clearErrorUser: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

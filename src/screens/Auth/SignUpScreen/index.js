import SignUpScreen from './SignUpScreen';

import {connect} from 'react-redux';

import {createAccount, clearError} from '../../../actions/usersActions';

const mapStateToProps = state => {
  return {
    loading: state.users.loading,
    user: state.users.userAuth,
    error: state.users.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => {
      dispatch(createAccount(data));
    },
    clearErrorUser: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

import DefaultDrawer from './DefaultDrawer';

import {connect} from 'react-redux';

import {clearUser} from '../../actions/usersActions';

const mapDispatchToProps = dispatch => {
  return {
    onPressLogout: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(DefaultDrawer);

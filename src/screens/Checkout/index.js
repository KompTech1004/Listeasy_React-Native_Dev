import Checkout from './Checkout';
import {connect} from 'react-redux';
import {orderTour} from '../../actions/toursActions';

const mapStateToProps = state => {
    return {
        tour: state.tours.tour
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderTour: (tourID, postTime) => {
            dispatch(orderTour(tourID, postTime));
          },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
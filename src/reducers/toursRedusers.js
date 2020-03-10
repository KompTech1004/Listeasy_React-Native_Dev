import {
  SET_TOUR,
  SET_LOADING,
  SET_TOURS,
  SET_PICTURES,
} from '../actions/toursActions';

import {CLEAR_USER} from '../actions/usersActions';

const initState = {
  pictures: null,
  testValue: 'www',
  tour: {
    posterid: null,
    tourlocation: '',
    posttime: '',
  },
  tours: {
    tourID: null,
    posterID: null,
    tour_location: '',
    music_name: '',
    photo_order: null,
  },
  error: null,
  loading: true,
};

const toursReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOUR: {
      return {
        ...state,
        tour: action.payload,
      };
    }
    case SET_TOURS: {
      return {
        ...state,
        tours: action.payload,
      };
    }
    case SET_PICTURES: {
      return {
        ...state,
        pictures: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default toursReducer;

import {
  TOUR_ADD_PICTURE,
  TOUR_CHANGE_FIELD,
  TOUR_DELETE_PICTURE,
  TOUR_MOVE_PICTURE,
  SET_ERROR,
  SET_LOADING,
  TOUR_SET_PHOTO_LIST,
  TOUR_SET_TOUR,
} from '../actions/editTourAction';

const initState = {
  tour: null,
  pictureList: null,
  loading: true,
  error: null,
};

const editTourReducer = (state = initState, action) => {
  switch (action.type) {
    case TOUR_ADD_PICTURE: {
      return {
        ...state,
        pictureList: state.pictureList.concat(action.payload),
      };
    }

    case TOUR_CHANGE_FIELD: {
      return {
        ...state,
        tour: {
          ...state.tour,
          [action.name]: action.value,
        },
      };
    }

    case TOUR_DELETE_PICTURE: {
      return {
        ...state,
        pictureList: state.pictureList.filter(
          picture => picture.mediaID !== action.payload,
        ),
      };
    }

    case TOUR_SET_PHOTO_LIST: {
      return {
        ...state,
        pictureList: action.payload,
      };
    }

    case TOUR_MOVE_PICTURE: {
      return {
        ...state,
        pictureList: action.payload,
      };
    }

    case TOUR_SET_TOUR: {
      return {
        ...state,
        tour: action.payload,
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
export default editTourReducer;

export const TOUR_ADD_PICTURE = 'TOUR_ADD_PICTURE';
export const TOUR_DELETE_PICTURE = 'TOUR_DELETE_PICTURE';
export const TOUR_MOVE_PICTURE = 'TOUR_MOVE_PICTURE';
export const TOUR_CHANGE_FIELD = 'TOUR_CHANGE_FIELD';
export const TOUR_SET_TOUR = 'TOUR_SER_TOUR';
export const TOUR_SET_PHOTO_LIST = 'TOUR_SET_PHOTO_LIST';
export const SET_ERROR = 'SET_ERROR_TOUR';
export const SET_LOADING = 'SET_LOADING_EDIT_TOUR';

import { addPhotoToTour } from './toursActions';

import moment from 'moment';
import API from '../api';

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export const addPicture = picture => ({
  type: TOUR_ADD_PICTURE,
  payload: picture,
});

export const deletePicture = id => ({
  type: TOUR_DELETE_PICTURE,
  payload: id,
});

export const movePicture = pictureList => ({
  type: TOUR_MOVE_PICTURE,
  payload: pictureList,
});

export const changeField = (name, value) => ({
  type: TOUR_CHANGE_FIELD,
  name,
  value,
});

export const setTour = tour => dispatch => {
  dispatch(setLoading(true));
  dispatch({
    type: TOUR_SET_TOUR,
    payload: tour,
  });
  dispatch(getTourPictures(tour));
};

export const setPhotos = photos => ({
  type: TOUR_SET_PHOTO_LIST,
  payload: photos,
});

export const getTourPictures = tourData => dispatch => {
  const getPictures = new FormData();
  getPictures.append('tourID', tourData.tourID);

  API.post('/user/get_media_list_for_tour', getPictures, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        console.log("responseee", response)
        const pictureList = response.data.medialist;
        const newPictureList = [];

        const imageArray = tourData.photo_order.split(',');
        imageArray.forEach(photo => {
          var image = pictureList.find(picture => picture.mediaID === photo);

          if (image !== undefined) {
            newPictureList.push(image);
          }
        });

        dispatch(setPhotos(newPictureList));
      } else {
        dispatch(setError(response.data));
      }
    })
    .then(() => dispatch(setLoading(false)))
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const updateTour = (tourData, photoList) => dispatch => {
  dispatch(setLoading(true));
  let orderList = '';

  photoList.forEach(photo => {
    if (photo.mediaID !== undefined) {
      orderList = orderList.concat(`${photo.mediaID.toString()},`);
    }
  });

  console.log("updated", photoList)

  const updatingTour = new FormData();
  updatingTour.append('tourid', tourData.tourID);
  updatingTour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));
  updatingTour.append('posterid', tourData.posterID);
  updatingTour.append('tourlocation', tourData.tour_location);
  updatingTour.append('music_name', tourData.music_name);
  updatingTour.append('is_active', tourData.is_active);
  updatingTour.append('photo_order', orderList);

  API.post('/user/update_tour', updatingTour, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      console.log('Update tour responce: ', response.data);
      return response.data;
    })
    .then(() => dispatch(setLoading(false)))
    .catch(error => console.log('Error with update toure', error));
};

export const updatePhoto = (tourData, pictureList) => dispatch => {
  const addingPhotos = pictureList.filter(
    photo => photo.posterID === undefined,
  );
  dispatch(addPhotoToTour(tourData, addingPhotos));
};

export const sendLink = (tourID, email) => dispatch => {
  dispatch(setLoading(true));
  return API.post('/user/send_email', {
    tourID: tourID,
    useremail: email
  }).then(response => {
    dispatch(setLoading(false));
    return response.status;
  }).catch(err => console.log('Error with send link', err));
}

import moment from 'moment';
import API from '../api';
import ImageResizer from 'react-native-image-resizer';

export const SET_TOUR = 'SET_TOUR';
export const SET_TOURS = 'SET_TOURS';
export const SET_PICTURES = 'SET_PICTURES';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_STATUS';

const setTour = tour => ({
  type: SET_TOUR,
  payload: tour,
});

const setTours = tours => ({
  type: SET_TOURS,
  payload: tours,
});

const setPictures = pictures => ({
  type: SET_PICTURES,
  payload: pictures,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

var isLoadingImages = false

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const getTourList = userId => dispatch => {
  dispatch(setLoading(true));
  const getTours = new FormData();
  getTours.append('userid', userId);

  API.post('/user/get_tour_list', getTours, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setTours(response.data.tourlist));
        return response.data.tourlist;
      } else {
        dispatch(setError(response.data));
      }
    })
    .then(() => {
      if (!isLoadingImages) {
        dispatch(setLoading(false))
      }
      else {

      }

    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const getMyTourList = userId => dispatch => {
  dispatch(setLoading(true));
  const getTours = new FormData();
  getTours.append('userid', userId);

  API.post('/user/get_tour_list', getTours, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        const myTours = response.data.tourlist.filter(
          tour => tour.posterID === userId,
        );
        dispatch(setTours(myTours));
        return response.data.tourlist;
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

export const getTourPictures = tourId => dispatch => {
  dispatch(setLoading(true));

  const getPictures = new FormData();
  getPictures.append('tourID', tourId);

  API.post('/user/get_media_list_for_tour', getPictures, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setPictures(response.data.medialist));

        console.log('Response z serva: ', response.data);
        return response.data.medialist;
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

export const createTour = (
  userId,
  location,
  photoL,
  selectedSong,
) => dispatch => {
  dispatch(setLoading(true));
  const newTour = new FormData();
  newTour.append('posterid', userId);
  newTour.append('tourlocation', location);
  newTour.append('music_name', selectedSong);
  newTour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));

  API.post('/user/create_tour', newTour, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setTour(response.data.tourinfo));
        return response.data.tourinfo;
      } else {
        dispatch(setError(response.data));
      }
    })
    .then(tour => {
      dispatch(addPhotoToTour(tour, photoL));
      return tour;
    })
    .then(tour => {
      // dispatch(updateTour(tour, photoL));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const orderTour = (tourID, postTime) => dispatch => {
  dispatch(setLoading(true));
  API.post('/user/update_tour', {
    tourid: tourID,
    is_paid: 'YES',
    posttime: postTime
  }).then(response => {
    if (response.data.status == 200) {
      dispatch(setTour(response.data.tourinfo));
      return response.data.tourinfo;
    } else {
      dispatch(setError(response.data));
    }
  })
} 

export const deleteTour = deletingTourId => dispatch => {
  dispatch(setLoading(true));

  const deletingTour = new FormData();
  deletingTour.append('tourid', deletingTourId);

  API.post('/user/remove_tour', deletingTour, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(getTourList());
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

export const tourStatus = (tourId, isActive, postTime) => dispatch => {
  dispatch(setLoading(true));

  const statusUpdate = new FormData();
  statusUpdate.append('tourid', tourId);
  statusUpdate.append('is_active', isActive);
  statusUpdate.append('posttime', postTime);

  API.post('/user/update_tour', statusUpdate, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(getTourList());
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

async function addRecursionPhotoToTour(tour, photoList, index, responceSave, dispatch) {
  dispatch(setLoading(true));
  isLoadingImages = true

  if (index < photoList.length) {
    const resizedImage = await ImageResizer.createResizedImage(photoList[index].uri, 1920, 1080, 'JPEG', 100);
    var dataIncome = new FormData();

    photoList[index].uri = resizedImage.uri
    photoList[index].name = "photo" + resizedImage.name

    dataIncome.append('tourID', tour.tourID);
    dataIncome.append('photo', photoList[index]);

    await API.post('/user/add_photo_for_tour', dataIncome, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        responceSave = response
        new Promise((resolve) =>
          setTimeout(
            () => {
              // photoList[index].mediaID = response.mediaID
              // console.log("photoList1", response)
              // console.log("photoList1", response.mediaID)
              var test = index += 1
              return addRecursionPhotoToTour(tour, photoList, test, responceSave, dispatch)
            },
            1000
          )
        );

      }
      )
      .catch(error => {
        console.log('Error ' + error);
      });
  }
  else {
    isLoadingImages = false
    dispatch(setLoading(false));

    //Here I use reverse for showing an array for the tours screen in the right order after creating a tour
    updateTour(tour, responceSave.data.medialist.reverse());
  }

  return true;
}

function updateTour(tourData, photoList) {
  let orderList = '';

  photoList.forEach(photo => {
    if (photo.mediaID !== undefined) {
      orderList = orderList.concat(`${photo.mediaID.toString()},`);
    }
  });

  console.log("photoList", photoList)

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
    // .then(() => dispatch(setLoading(false)))
    .catch(error => console.log('Error with update toure', error));
};

export const addPhotoToTour = (tour, photoList) => dispatch => {

  addRecursionPhotoToTour(tour, photoList, 0, null, dispatch)
};

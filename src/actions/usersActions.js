import {Platform} from 'react-native';

import {DEFAULT_URL} from '../config/server';
import axios from 'react-native-axios';

import moment from 'moment';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_USER_LOADING';
export const SET_ERROR = 'SET_USER_ERROR';
export const SET_SUCCESS = 'SET_USER_SUCCESS';
export const CHANGE_USER_FIELD = 'CHANGE_USER_FIELD';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_USER_ID = 'SET_USER_ID';

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const setUserId = id => ({
  type: SET_USER_ID,
  payload: id,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setSuccess = value => ({
  type: SET_SUCCESS,
  payload: value,
});

export const clearError = () => dispatch => {
  dispatch(setLoading(false));
  dispatch(setError(null));
};

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER,
  });
};

export const onChangeUserInfo = (name, value) => ({
  type: CHANGE_USER_FIELD,
  name,
  value,
});

export const loginWithEmail = (e, p) => dispatch => {
  if (e.length != 0 && p.length != 0) {
    dispatch(setLoading(true));

    fetch(`${DEFAULT_URL}/user/user_login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e,
        password: p,
        device_type: Platform.OS === 'ios' ? 0 : 1,
        action_time: Date().toLocaleString(),
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          dispatch(setUser(responseJson.userinfo));
          dispatch(setLoading(false));
        } else {
          dispatch(setError('email or password is Incorrect'));
          dispatch(setLoading(false));
        }
      })
      .catch(error => {
        dispatch(setError(error));
      });
  } else {
    dispatch(setError('Email or password must not be empty'));
  }
};

export const createAccount = data => dispatch => {
  dispatch(setLoading(true));

  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('device_type', Platform.OS === 'ios' ? 0 : 1);
  formData.append('action_time', Date().toLocaleString());

  fetch(`${DEFAULT_URL}/user/user_signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        //dispatch(setUser(responseJson.userinfo));
        dispatch(setUserId(responseJson.userinfo.userid));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

export const createUserProfile = (newProfile, userid) => dispatch => {
  const profile = new FormData();
  profile.append('userid', userid);
  profile.append('fullname', newProfile.fullname);
  profile.append('direct_tel', newProfile.direct_tel);
  profile.append('title', newProfile.title);
  profile.append('website', newProfile.website);
  profile.append('job_title', newProfile.job_title);
  profile.append('office_tel', newProfile.office_tel);

  fetch(`${DEFAULT_URL}/user/user_update_profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: profile,
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        dispatch(setUser(responseJson.userinfo));
        dispatch(setSuccess(true));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const updateUser = (newProfile, photo = null) => dispatch => {
  dispatch(setLoading(true));
  const profile = new FormData();
  profile.append('userid', newProfile.userid);
  profile.append('fullname', newProfile.fullname);
  profile.append('direct_tel', newProfile.direct_tel);
  profile.append('title', newProfile.title);
  profile.append('website', newProfile.website);
  profile.append('job_title', newProfile.job_title);
  profile.append('office_tel', newProfile.office_tel);

  if (photo !== null) {
    profile.append('photo', {
      name: photo.fileName,
      type: photo.type === null ? 'image/jpeg' : photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
  }

  axios({
    method: 'post',
    url:
      // 'http://3.136.62.106/Listeasy/backend/index.php/user/user_update_profile',
      'http://13.58.111.58/Listeasy/backend/index.php/user/user_update_profile',
    data: profile,
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(responseJson => {
      // alert(responseJson.data.status);
      if (responseJson.data.status === 200) {
        dispatch(setUser(responseJson.data.userinfo));
        dispatch(setSuccess(true));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const loginWithFacebook = token => dispatch => {
  dispatch(setLoading(true));

  var formData = new FormData();

  //formData.append('facebookid', '820106268445537');
  formData.append('facebookid', token);
  formData.append('token', token);
  formData.append('action_time', moment().format('YYYY:MM:DD HH:mm:ss'));
  //formData.append('action_time', '2019:12:19 04:13:50');

  fetch(
    // `http://3.136.62.106/Listeasy/backend/index.php/user/user_facebook_login`,
    `http://13.58.111.58/Listeasy/backend/index.php/user/user_facebook_login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        dispatch(setUser(responseJson.userinfo));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const loginWithGoogle = token => dispatch => {
  dispatch(setLoading(true));

  fetch(
    // `http://3.136.62.106/Listeasy/backend/index.php/user/user_google_login`,
    `http://13.58.111.58/Listeasy/backend/index.php/user/user_google_login`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        googleid: token,
        action_time: moment().format('YYYY:MM:DD HH:mm:ss'),
      }),
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        dispatch(setUser(responseJson.userinfo));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

import {combineReducers} from 'redux';

import usersReducer from './usersReducer';
import toursRedusers from './toursRedusers';
import editTourReducer from './editTourReducer';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  tours: toursRedusers,
  editTour: editTourReducer,
});

export default persistReducer(persistConfig, rootReducer);

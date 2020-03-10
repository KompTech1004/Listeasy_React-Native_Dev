import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';

import rootReducer from '../reducers';
import {persistStore} from 'redux-persist';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export const persistor = persistStore(store);

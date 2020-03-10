import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';
import AppNavigation from './navigation';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigation />
    </PersistGate>
  </Provider>
);

export default App;

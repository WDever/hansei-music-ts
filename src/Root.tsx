import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore;

const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;

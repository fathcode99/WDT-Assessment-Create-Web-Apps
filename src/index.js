import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// set react-router-dom route routes
import { BrowserRouter } from 'react-router-dom';

// set redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducer from './reducer'

const globalState = createStore(allReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

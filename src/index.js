import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import store from './store';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});


ReactDOM.render(

<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>

, document.getElementById('root'));
registerServiceWorker();

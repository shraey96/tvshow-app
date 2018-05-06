import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';

import store from './store';

import Analytics from 'react-router-ga';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});
    // <BrowserRouter>
  // </BrowserRouter>
ReactDOM.render(

<Provider store={store}>

  <HashRouter>
    <Analytics id="UA-117273991-2" debug>
    <App />
    </Analytics>
  </HashRouter>

</Provider>

, document.getElementById('root'));
registerServiceWorker();

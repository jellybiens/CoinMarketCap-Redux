import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/style.scss';
import App from './components/App';

import configurestore from './store/configurestore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = configurestore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

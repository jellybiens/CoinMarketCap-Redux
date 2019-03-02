import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/style-layout.scss';
import App from './components/App';

import configurestore from './store/configurestore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { update_view_width } from './actions/actions-index';

const store = configurestore();

window.addEventListener('resize', () => {
    store.dispatch(update_view_width(window.innerWidth));
});


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

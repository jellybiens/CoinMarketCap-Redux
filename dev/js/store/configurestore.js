import allReducers from '../reducers/reducers-index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configurestore = (initialState) => {
    return createStore(
        allReducers,
        initialState,
        applyMiddleware(thunk)
    );
}

export default configurestore;

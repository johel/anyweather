// import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import reducers from './reducer';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, Logger));

// store.dispatch({type:'FETCH_CURRENT_WEATHER'});

export default store;
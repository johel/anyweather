// import React from 'react';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

function weatherReducer(state={}, action){
	return state;
}

let reducers = combineReducers({
  weather: weatherReducer
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

export default store;
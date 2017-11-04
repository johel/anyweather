// import React from 'react';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import currentWeatherReducer, * as fromWeather from './services/weather/reducer';

//SELECTORS
export function wasCurrentWeatherDataFound(state){
	return fromWeather.wasDataFound(state.weather);
}

let reducers = combineReducers({
  weather: currentWeatherReducer
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, Logger));

// store.dispatch({type:'FETCH_CURRENT_WEATHER'});

export default store;
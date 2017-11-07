import { combineReducers } from 'redux';
import currentWeatherReducer, * as fromWeather from './scenes/Home/reducer';

//SELECTORS
export function wasCurrentWeatherDataFound(state){
	return fromWeather.wasDataFound(state.weather);
}

let reducers = combineReducers({
  weather: currentWeatherReducer
});

export default reducers;
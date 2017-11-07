import {
	RETRIEVE_LOCATION,
	RETRIEVE_LOCATION_FAIL,
	FETCH_CURRENT_WEATHER,
	FETCH_CURRENT_WEATHER_SUCCESS,
	FETCH_CURRENT_WEATHER_FAIL
} from './constants.js';


const ERROR_TYPE = {
	NO_DATA: 'NO_DATA',
	UNEXPECTED: 'UNEXPECTED'
}

const initialState = {
	isRetrievingLocation:false,
	isLoading:false,
	weather:undefined,
	error:undefined
}


export default function currentWeatherReducer(state = initialState, action){
	switch (action.type){
		case RETRIEVE_LOCATION:
			return Object.assign({}, state, {isRetrievingLocation:true});
		case FETCH_CURRENT_WEATHER:
			return Object.assign({}, state, {isLoading:true});
		case FETCH_CURRENT_WEATHER_SUCCESS:
			let {data} = action.payload;
			return {weather:data, error:undefined, isLoading:false, isRetrievingLocation:false};
		case FETCH_CURRENT_WEATHER_FAIL:
			let {status} = action.payload;
			if(status === 404 || status === 400){
				return {isLoading:false, isRetrievingLocation:false, weather:undefined, error:{type:ERROR_TYPE.NO_DATA}};
			}
			return {isLoading:false, isRetrievingLocation:false, weather:undefined, error:{type:ERROR_TYPE.UNEXPECTED}};
		default:
			return state;
	}
}

//SELECTORS
export function wasDataFound(state){
	return !!state.error && error.type===ERROR_TYPE.NO_DATA;
}


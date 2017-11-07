import {
	FETCH_CURRENT_WEATHER,
	FETCH_CURRENT_WEATHER_SUCCESS,
	FETCH_CURRENT_WEATHER_FAIL,
  RETRIEVE_LOCATION,
  RETRIEVE_LOCATION_FAIL
} from './constants.js';
import {requestWeatherDataByCoordinates, requestWeatherDataByCity, getGeolocation} from '~/services/api';
import iconsMap from '../../constants/icons.js';

function Weather(data){
  let {main,sys,name, weather} = data;

  //description and icon
  this.description = weather[0].description;
  this.iconName = iconsMap[weather[0].id].icon;

  //range min and max
  this.temp = main.temp;
  this.tempMin = main.temp_min;
  this.tempMax = main.temp_max;

  //city and country
  this.city = name;
  this.country = sys.country;
}

Weather.prototype.toPlainObject = function(){
	let {description,iconName,temp,tempMin,tempMax,city,country} = this;
	return {description,iconName,temp,tempMin,tempMax,city,country};
}


export const getCurrentWeatherDataByCity = (city) => (dispatch) => {
	dispatch({type:FETCH_CURRENT_WEATHER});
	return requestWeatherDataByCity(city)
    .then(data => {
      let weather = new Weather(data);
      dispatch({type:FETCH_CURRENT_WEATHER_SUCCESS, payload:{data:weather.toPlainObject()}});
    },err => {
      if(err.response && (err.response.status==404 || err.response.status==400)){
      	dispatch({type:FETCH_CURRENT_WEATHER_FAIL, payload:{status:err.response.status}});
      }else{
        dispatch({type:FETCH_CURRENT_WEATHER_FAIL, payload:{status:err.response.status}});
      }
    }).catch(err=>{
      console.log('err',err);
      dispatch({type:FETCH_CURRENT_WEATHER_FAIL, payload:{status:err}});
    })
}

export const  getInitialWeatherData = () => (dispatch) => {
  dispatch({type:RETRIEVE_LOCATION});
  return  getGeolocation().then(({lat,lon}) => {
    return getCurrentWeatherDataByCoordinates(lat,lon,dispatch);
  }, err => {
    console.log('erro de permissão de geo data');
  })
}

function getCurrentWeatherDataByCoordinates(lat,lon, dispatch){
  return requestWeatherDataByCoordinates(lat,lon)
    .then(data => {
        let weather = new Weather(data);
        dispatch({type:FETCH_CURRENT_WEATHER_SUCCESS, payload:{data:weather.toPlainObject()}});
    })
}
import axios from 'axios';

const APP_ID = '190cbbb41d486d8f2ba59457e85701de';
const units='metric';
const BASE_URL = "https:\//api.openweathermap.org/data/2.5/weather";

const weatherAPI = axios.create({
  baseURL: BASE_URL
});

export function requestWeatherDataByCoordinates(lat,lon){
	return weatherAPI.get('/', {params:{lat, lon, appid:APP_ID, units}}).then(response => {
		return response.data;
	})
}

export function requestWeatherDataByCity(cityName){
	return weatherAPI.get('/', {params:{q:cityName, appid:APP_ID, units}}).then(response => {
		return response.data;
	})
}

export function getGeolocation(){
  return new Promise((resolve,reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve({lat:position.coords.latitude, lon:position.coords.longitude});
      });
    } else {
      reject("I'm sorry, but geolocation services are not supported by your browser.");
    }
  })
}
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weatherActions from './actions.js';
import axios from 'axios';
import iconsMap from '../../constants/icons.js';
import CurrentWeather from './components/CurrentWeather';
import WeatherPanel from './WeatherPanel';
import UncontrolledSearchBar from '../../components/UncontrolledSearchBar';
import {requestWeatherDataByCoordinates, requestWeatherDataByCity} from '../../services/api';

const SearchBar = connect(null,{
  onSearch: weatherActions.getCurrentWeatherDataByCity
})(UncontrolledSearchBar);


function getGeolocation(){
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

export default class Home extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

    // getGeolocation().then(coords => {
    //   let {lat,lon} = coords;

    //   this.setState({loading:true});
    //   requestWeatherDataByCoordinates(lat,lon)
    //     .then(data => {
    //       let weather = new Weather(data);
    //       console.log('weather', weather);
    //       this.setState({loading:false, weather, noCityFound:false, errorOcurred:false});
    //     }).catch(err=>{
    //       this.setState({loading:false});
    //     })

    // }, err => {
    //   console.log(err);
    // })

  }

  render(){
    return (
      <div className="container">
        <header className="header">
          <SearchBar/>
        </header>

        <div className="content">

          <div className="panel">
            <WeatherPanel />
          </div>

        </div>

      </div>
    );
  }

}


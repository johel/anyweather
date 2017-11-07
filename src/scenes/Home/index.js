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


export default class Home extends Component {
  constructor(props){
    super(props);
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


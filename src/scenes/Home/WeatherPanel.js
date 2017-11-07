import React, {Component} from 'react';
import { connect } from 'react-redux';
import CurrentWeather from './components/CurrentWeather';
import {getInitialWeatherData} from './actions.js';

class WeatherPanel extends Component{
	constructor(props){
		super(props);
	}

  componentDidMount(){
    this.props.getInitialWeatherData();
  }

	render(){
		let {weather,loading, isRetrievingLocation, wasCityFound} = this.props;
		console.log('this.props', this.props);

    if(isRetrievingLocation){
      return(
        <div>
          <h2 className="city" id="city">Retrieving your location...</h2>
          <div className="weather" id="weather">
            <i className="weather__icon fa fa-search"></i>
            <h3 className="weather__range">-- / -- </h3>
            <h3 className="weather__description">Almost There</h3>
          </div>
        </div>
      )
    }

    if(loading){
      return(
        <div>
          <h2 className="city" id="city">Searching...</h2>
          <div className="weather" id="weather">
            <i className="weather__icon fa fa-search"></i>
            <h3 className="weather__range">-- / -- </h3>
            <h3 className="weather__description">Almost There</h3>
          </div>
        </div>
      )
    }

    if(!wasCityFound){
      return(
        <div>
            <h2 className="city" id="city">No Results</h2>
            <div className="weather" id="weather">
              <i className="weather__icon fa fa-thumbs-down"></i>
              <h3 className="weather__description">Verify your search</h3>
            </div>
        </div>
      )
    }

    if(weather && !loading){
      let {description, iconName, tempMin, tempMax} = weather;
      return (
        <div>
          <h2 className="city" id="city">{weather.city}, {weather.country}</h2>
          <CurrentWeather 
            iconName={iconName} 
            description={description}
            tempMin={tempMin}
            tempMax={tempMax}
            />
        </div>
      );
    }


     return(
        <div>
          <h2 className="city" id="city">Olá</h2>
          <div className="weather" id="weather">
            <i className="weather__icon fa fa-search"></i>
            <h3 className="weather__range">-- / -- </h3>
            <h3 className="weather__description">Pesquise uma Cidade</h3>
          </div>
        </div>
      )

	}

}

const mapStateToProps = (state) =>{
	return {
		weather:state.weather.weather,
		loading:state.weather.isLoading,
    isRetrievingLocation: state.weather.isRetrievingLocation,
		wasCityFound: !!state.weather.weather,
	}
}

export default connect(mapStateToProps, {getInitialWeatherData})(WeatherPanel);
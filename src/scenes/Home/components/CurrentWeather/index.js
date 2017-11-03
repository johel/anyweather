import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

function CurrentWeather({iconName, description,tempMin,tempMax}){
  return(
    <div className="weather" id="weather">
      <i className={`weather__icon wi wi-${iconName}`}></i>
      <h3 className="weather__range">{tempMin}º / {tempMax}º </h3>
      <h3 className="weather__description">{description}</h3>
    </div>
  )
}


CurrentWeather.propTypes = {
  iconName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired
};

export default CurrentWeather;

import React, {Component} from 'react';
import axios from 'axios';
import iconsMap from '../../constants/icons.js';
import CurrentWeather from './components/CurrentWeather/index';
const APP_ID = '190cbbb41d486d8f2ba59457e85701de';
const q = 'Rio de Janeiro';
const units='metric';
const BASE_URL = "https:\//api.openweathermap.org/data/2.5/weather";

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

class UncontrolledSearchBar extends Component {
  constructor(props){
    super(props);  
    this.onClick = this.onClick.bind(this); 
    this.onKeyPress = this.onKeyPress.bind(this); 
  }

  onClick(e) {
    console.log('event click', e)
    const input = this.refs.myInput;  
    const value = input.value;  
    this.props.onSearch(value);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('pressed enter - chamar api', e.target.value);
      this.props.onSearch(e.target.value);
    }
  }

  render(){

    return(
      <div action="#" className="search">
        <input ref="myInput" type="text" className="search__input" onKeyPress={this.onKeyPress} placeholder="Search anywhere" />
        <button className="search__button" onClick={this.onClick}>
          <i className="fa fa-search search__icon"></i>
        </button>
      </div>
    )
  }

} 


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
    this.state = {loading:false, weather:undefined, searchText:'', noCityFound:false, errorOcurred:false}
  }

  componentDidMount(){

    getGeolocation().then(coords => {
      let {lat,lon} = coords;

      this.setState({loading:true});
      axios.get(BASE_URL, {params:{lat, lon, appid:APP_ID, units}})
        .then(response => {
          let weather = new Weather(response.data);
          console.log('weather', weather);
          this.setState({loading:false, weather, noCityFound:false, errorOcurred:false});
        }).catch(err=>{
          this.setState({loading:false});
        })

    }, err => {
      console.log(err);
    })

  }

  renderWeather(){
    let {weather,loading, noCityFound} = this.state;

    if(loading){
      return(
        <div>
            <h2 className="city" id="city">Buscando...</h2>
            <div className="weather" id="weather">
              <i className="weather__icon fa fa-search"></i>
              <h3 className="weather__range">-- / -- </h3>
              <h3 className="weather__description">Estamos Quase Lá</h3>
            </div>
        </div>
      )
    }

    if(noCityFound){
      return(
        <div>
            <h2 className="city" id="city">Cidade Não Encontrada</h2>
            <div className="weather" id="weather">
              <i className="weather__icon fa fa-thumbs-down"></i>
              <h3 className="weather__description">Verifique sua busca</h3>
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
    
  }

  searchCityWeather(cityName){
    this.setState({loading:true});
    axios.get(BASE_URL, {params:{q:cityName, appid:APP_ID, units}})
      .then(response => {
        let weather = new Weather(response.data);
        console.log('weather', weather);
        this.setState({loading:false, weather, noCityFound:false, errorOcurred:false});
      },err => {
        console.log('err',err);
        if(err.response && err.response.status==404){
          this.setState({loading:false, noCityFound:true, errorOcurred:false});
        }else{
          this.setState({loading:false, noCityFound:false, errorOcurred:true});
        }
      }).catch(err=>{
        console.log('err',err);
        this.setState({loading:false, noCityFound:false, errorOcurred:true});
      })
  }

  render(){
    let {weather,loading} = this.state;
    console.log('state',this.state);

    return (
      <div className="container">
        <header className="header">
          <UncontrolledSearchBar onSearch={this.searchCityWeather.bind(this)}/>
        </header>

        <div className="content">

          <div className="panel">
            {this.renderWeather()}
          </div>

        </div>

      </div>
    );
  }

}


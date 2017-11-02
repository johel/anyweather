import React, {Component} from 'react';
import axios from 'axios';
const APP_ID = '190cbbb41d486d8f2ba59457e85701de';
const q = 'Rio de Janeiro';
const units='metric';
import iconsMap from '../../constants/icons.js';

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
    this.state = {loading:false, data:undefined, searchText:''}
  }

  componentDidMount(){

    console.log('iconsMap', iconsMap)

    getGeolocation().then(coords => {
      let {lat,lon} = coords;

      axios.get('http://api.openweathermap.org/data/2.5/weather', {params:{lat, lon, appid:APP_ID, units}})
        .then(response => {
          console.log('response lat e lon', response);
          this.setState({loading:false, data:response.data});
        }).catch(err=>{
          this.setState({loading:false});
        })

    }, err => {
      console.log(err);
    })


    // axios.get('http://api.openweathermap.org/data/2.5/weather', {params:{q, appid:APP_ID, units}})
    //   .then(response => {
    //     console.log('response', response);
    //     this.setState({loading:false, data:response.data});
    //   }).catch(err=>{
    //     this.setState({loading:false});
    //   })

  }

  render(){
    return (
      <div className="container">
        <header className="header">
          <div action="#" className="search">
            <input type="text" className="search__input" placeholder="Search anywhere" />
            <button className="search__button">
              <i className="fa fa-search search__icon"></i>
            </button>
          </div>
        </header>

        <div className="content">

          <div className="panel">
            <h2 className="city" id="city">Mountain View, US</h2>
            <div className="weather" id="weather">
              <i className="weather__icon wi wi-day-sunny"></i>
              <h3 className="weather__range">22º / 29º </h3>
              <h3 className="weather__description">Few Clouds</h3>
            </div>
            <div className="forecast">
              <div>forecast 1</div>
              <div>forecast 1</div>
              <div>forecast 1</div>
              <div>forecast 1</div>
              <div>forecast 1</div>
            </div>
          </div>

        </div>

      </div>
    );
  }

}


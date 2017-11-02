import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Routes from './router';
import store from './store';
import '../style/style.css';
import 'font-awesome/css/font-awesome.min.css';
import 'weather-icons/css/weather-icons.min.css';

const App = () => {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

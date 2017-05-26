import React, { Component } from 'react';
import classNames from 'classnames';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import './components/actions.css';
import './fonts/fonts.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIsActive: true,
      forecastIsActive: false
    };
  } //end constructor

  handleChangeToCurrent = () => {
    (this.state.currentIsActive !== true)
      ? this.setState({ currentIsActive: true, forecastIsActive: false })
      : this.setState({ forecastIsActive: true, currentIsActive: false });

  } //end handleChangeToMetric

  handleChangeToForecast = () => {
    (this.state.forecastIsActive !== true)
      ? this.setState({ forecastIsActive: true, currentIsActive: false })
      : this.setState({ currentIsActive: true, forecastIsActive: false });
  } //end handleChangeToImperial

  render() {
    let btnCurrent = classNames('button', { active: this.state.currentIsActive });
    let btnForecast = classNames('button', { active: this.state.forecastIsActive });
    return (
      <div className="App">
        <div className="background-image"></div>
        <Header header="Local Weather" />
        <div className="action-btn-group">
          <button className={btnCurrent} onClick={this.handleChangeToCurrent}>Now</button>
          <button className={btnForecast} onClick={this.handleChangeToForecast}>Forecast</button>
        </div>
        {(this.state.currentIsActive)
          ? <CurrentWeather />
          : null}
        {(this.state.forecastIsActive)
          ? <ForecastWeather />
          : null}
      </div>
    );
  }
}

export default App;

import React from 'react';
import FiveDayForecast from './FiveDayForecast';
import './ForecastWeather.css';

class ForecastWeather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			forecastArray: []
		};
	} //end constructor

	getWeatherForecast(position) {
		let pos_lat = position.lat;
		let pos_lon = position.lon;
		fetch(`https://api.wunderground.com/api/a856679be7a8710b/forecast/q/${pos_lat},${pos_lon}.json`).then(res => res.json()).then(data => {
			const weatherData = data.forecast.simpleforecast;
			const forecastData = weatherData.forecastday;
			this.setState({date: weatherData.date, forecastArray: forecastData});
		}).catch(err => {
			console.error('Fetch failed', err, err.message);
		});
	}; //end getWeatherForecast

	getPosition = () => {
		fetch('https://api.wunderground.com/api/a856679be7a8710b/geolookup/q/autoip.json').then(res => res.json()).then(data => {
			let position = {
				lat: data.location.lat,
				lon: data.location.lon
			};
			this.getWeatherForecast(position);
		});
	} //end getPosition

	componentDidMount() {
		this.getPosition();
	} //end componentDidMount

	render() {
		return (
			<div className="forecast_weather_body">
				<div className="">
					<div className="fct_wrapper">
						{this.state.forecastArray.map((item, index) => {
							return (<FiveDayForecast thread={item} key={index}/>);
						})}</div>
				</div>
			</div>
		);
	}
}

export default ForecastWeather;

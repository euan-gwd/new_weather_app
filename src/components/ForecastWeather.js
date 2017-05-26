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
		fetch(`http://api.wunderground.com/api/a856679be7a8710b/forecast/q/${pos_lat},${pos_lon}.json`).then(res => res.json()).then(data => {
			console.log(data);
			const weatherData = data.forecast.txt_forecast;
			const forecastData = weatherData.forecastday;
			this.setState({date: weatherData.date, forecastArray: forecastData});
		}).catch(err => {
			console.error('Fetch failed', err, err.message);
		});
	}; //end getWeatherForecast

	// getWeatherForecastMock() {
	// 	fetch(`http://localhost:9000/forecast`).then(res => res.json()).then(data => {
	// 		const weatherData = data.txt_forecast;
	// 		console.log(weatherData);
	// 		const forecastData = weatherData.forecastday;
	// 		this.setState({date: weatherData.date, forecastArray: forecastData});
	// 	}).catch(err => {
	// 		console.error('Fetch failed', err, err.message);
	// 	});
	// }; //end getWeatherForecastMock

	getPosition = () => {
		fetch('http://api.wunderground.com/api/a856679be7a8710b/geolookup/q/autoip.json').then(res => res.json()).then(data => {
			let position = {
				lat: data.location.lat,
				lon: data.location.lon
			};
			this.getWeatherForecast(position);
		});
	} //end getPosition

	componentDidMount() {
		this.getPosition();
		// this.getWeatherForecastMock();
	} //end componentDidMount

	render() {
		return (
			<div className="forecast_weather_body">
				<div className="">
					<div className="date">Weather Forecast</div>
					<div className="forecast_time">as of {this.state.date}</div>
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
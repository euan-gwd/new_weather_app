import React from 'react';
import ForecastWeather from './ForecastWeather';
import windIcon from '../icons/icon-43-wind.svg';
import humidityIcon from '../icons/icon-52-barometer.svg';
import temperatureIcon from '../icons/icon-69-thermometer-half.svg';
import rainIcon from '../icons/icon-rain.svg';
import './weather_backgrounds.css';
import './CurrentWeather.css';

class CurrentWeather extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			city: "",
			currenthumidity: "--",
			currentTemp: "--",
			currentFeels: "--",
			currentWind: "--",
			currentCondition: "",
			currentIcon: "",
			currentRain: "--"
		};
	} //end constructor

	getLocalWeather(position) {
		let pos_lat = position.lat;
		let pos_lon = position.lon;
		fetch(`https://api.wunderground.com/api/a856679be7a8710b/conditions/q/${pos_lat},${pos_lon}.json`).then(res => res.json()).then(data => {
			let weatherData = data.current_observation;
			let currentTemp = `${weatherData.temp_c}°C / ${weatherData.temp_f}°F`;
			let currentFeels = `Feels: ${weatherData.feelslike_c}°C / ${weatherData.feelslike_f}°F`;
			let icon = `${weatherData.icon}.svg`;
			const iconUrl = require(`../icons/${icon}`);
			let windSpeedKPH = `${weatherData.wind_kph} kph`;
			let windSpeedMPH = `${weatherData.wind_mph} mph`;
			let windDirection = weatherData.wind_dir;
			let currentWind = `${windSpeedKPH} / ${windSpeedMPH} from the ${windDirection}`;
			let rainTodayImperial = `${weatherData.precip_today_in}in `;
			let rainTodayMetric = `${weatherData.precip_today_metric} mm`;
			let currentRain = `${rainTodayMetric} / ${rainTodayImperial}`;
			let imgUrl = weatherData.icon;
			this.setState({
				city: weatherData.display_location.city,
				currenthumidity: weatherData.relative_humidity,
				currentTemp: currentTemp,
				currentFeels: currentFeels,
				currentWind: currentWind,
				currentCondition: weatherData.weather,
				currentImage: imgUrl,
				currentIcon: iconUrl,
				currentRain: currentRain,
				currentTime: weatherData.local_time_rfc822
			});
		}).catch(err => {
			console.error('Fetch failed', err, err.message);
		});
	}; //end getLocalWeather


	getPosition = () => {
		fetch('https://api.wunderground.com/api/a856679be7a8710b/geolookup/q/autoip.json').then(res => res.json()).then(data => {
			let position = {
				lat: data.location.lat,
				lon: data.location.lon
			};
			this.getLocalWeather(position);
		});
	} //end getPosition

	componentWillMount() {
		this.getPosition();
	} //end componentWillMount

	render() {
		return (
			<div className={this.state.currentImage}>
				<div className="current_weather_body">
					<div className="current_city">{this.state.city}</div>
					<div className="current_time">
						As of {this.state.currentTime}
					</div>
					<div className="container">
						<div className="current_conditions-wrapper">
							<img src={this.state.currentIcon} alt={this.state.currentIcon} className="icon-weather"/>
							<div className="current_conditions">{this.state.currentCondition}</div>
						</div>
						<div className="temperature-wrapper">
							<img src={temperatureIcon} alt="temperature icon" className="temperature_icon "/>
							<div className="temperature">{this.state.currentTemp || "--"}</div>
						</div>
						<div className="feels_like">{this.state.currentFeels || "--"}</div>
						<div className="wind-wrapper">
							<img src={windIcon} alt="wind icon"/>
							<div className="wind">{this.state.currentWind || "--"}</div>
						</div>
						<div className="rain-wrapper">
							<img src={rainIcon} alt="rain icon"/>
							<div className="rain-today">{this.state.currentRain || "--"}
								expected</div>
						</div>
						<div className="humidity-wrapper">
							<img src={humidityIcon} alt="humidity icon" className="humidity_icon"/>
							<div className="humidity">{this.state.currenthumidity || "--"}
								% humidity</div>
						</div>
					</div>
					<ForecastWeather />
				</div>
			</div>
		);
	}
}

export default CurrentWeather;

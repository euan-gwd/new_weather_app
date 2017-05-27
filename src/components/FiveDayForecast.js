import React from 'react';

class FiveDayForecast extends React.Component {
	render() {
		let icon = `${this.props.thread.icon}.svg`;
		const iconUrl = require(`../icons/${icon}`);
		let day = this.props.thread.date.weekday_short;
		let metricHigh = `${this.props.thread.high.celsius}°C`;
		let metricLow = `${this.props.thread.low.celsius}°C`;
		let impHigh = `${this.props.thread.high.fahrenheit}°F`;
		let impLow = `${this.props.thread.low.fahrenheit}°F`;
		let conditions = this.props.thread.conditions;
		return (
			<div className="ftc_item">
				<div className="ftc_box">
					<header className="ftc_title">
						{day}
					</header>
					<div className="has-icon-centered">
						<img src={iconUrl} height="32px" width="32px" alt="weather condition icon"/>
					</div>
					<div className="has-text-centered">{conditions}</div>
					<div className="temps_wrapper">
						<p className="max_temp">
							{metricHigh}	/ {impHigh}
						</p>
						<p className="min_temp">
							{metricLow} / {impLow}
						</p>
					</div>
				</div>
			</div>
		);
	}

}

export default FiveDayForecast;

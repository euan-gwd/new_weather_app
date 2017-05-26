import React from 'react';
import classNames from 'classnames';
import './actions.css';

class FiveDayForecast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			metricActive: true,
			imperialActive: false
		};
	} //end constructor

	handleChangeToMetric = () => {
		if (this.state.metricActive !== true) {
			this.setState({metricActive: true, imperialActive: false});
		}
	} //end handleChangeToMetric

	handleChangeToImperial = () => {
		if (this.state.imperialActive !== true) {
			this.setState({imperialActive: true, metricActive: false});
		}
	} //end handleChangeToImperial

	render() {
		//get icons
		let icon = `${this.props.thread.icon}.svg`;
		const iconUrl = require(`../icons/${icon}`);
		//setup unit change
		let btnMetric = classNames('button', {active: this.state.metricActive});
		let btnImperial = classNames('button', {active: this.state.imperialActive});
		console.log(this.props.thread);
		return (
			<div className="ftc_item">
				<div className="box">
					<header className="box-leveled">
						<p className="box-level-left ftc_title">{this.props.thread.title}</p>
						<div className="box-level-right"><img src={iconUrl} alt=""/></div>
					</header>
					<hr/>
					<div className="unit-btn-group">
						<button className={btnMetric} onClick={this.handleChangeToMetric}>°C</button>
						<button className={btnImperial} onClick={this.handleChangeToImperial}>°F</button>
					</div>
					<div className="fct_conditions">
						{(this.state.metricActive)
							? <p className="has-text-centered">{this.props.thread.fcttext_metric}</p>
							: null}
						{(this.state.imperialActive)
							? <p className="has-text-centered">{this.props.thread.fcttext}</p>
							: null}
					</div>
				</div>
			</div>
		);
	}
	
}

export default FiveDayForecast;

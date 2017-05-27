import React, {Component} from 'react';
import CurrentWeather from './components/CurrentWeather';
import './fonts/fonts.css';
import './App.css';

class App extends Component {

	render() {
		return (
			<div className="App">
				<div className="background-image"></div>
				<CurrentWeather/>
			</div>
		);
	}
}

export default App;

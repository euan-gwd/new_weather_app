import React, {Component} from 'react';
import CurrentWeather from './components/CurrentWeather';

class App extends Component {

	render() {
		return (
			<div className="App">
				<CurrentWeather/>
			</div>
		);
	}
}

export default App;

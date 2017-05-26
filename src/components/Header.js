import React from 'react';
import './Header.css';

class Header extends React.Component {

	render() {
		return (
			<div className="App-header">
				<h2 className="Title">{this.props.header}</h2>
			</div>
		);
	}

}

export default Header;

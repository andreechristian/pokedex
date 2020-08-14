import React from 'react'
import { lockAsync, OrientationLock } from 'expo-screen-orientation'
import { StatusBar } from 'expo-status-bar'

import { HomePage, PreloaderPage } from './modules'

// Lock orientation
// No need to handle this
lockAsync(OrientationLock.PORTRAIT).catch(err => null)


export default class App extends React.Component<{}, {
	isLoaded: boolean,
}> {

	state = {
		isLoaded: false,
		error: null,
	}

	onReady = () => {
		this.setState({
			isLoaded: true,
		})
	}

	render() {
		return (
			<React.Fragment>
				<StatusBar style="auto" />
				{ !this.state.isLoaded ? (
					<PreloaderPage onReady={ this.onReady } />
				) : (
					<HomePage />
				) }
			</React.Fragment>
		)
	}
}

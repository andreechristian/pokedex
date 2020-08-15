import React from 'react'
import { lockAsync, OrientationLock } from 'expo-screen-orientation'
import { StatusBar } from 'expo-status-bar'

import { HomePage, PreloaderPage, AlertUtilities, AlertUtilitiesInterface } from './modules'

// Lock orientation
// No need to handle this
lockAsync(OrientationLock.PORTRAIT).catch(err => null)


export default class App extends React.Component<{}, {
	isLoaded: boolean
	utilities: {
		alert: AlertUtilitiesInterface
	}
}> {

	state = {
		isLoaded: false,
		utilities: {
			alert: null as unknown as AlertUtilitiesInterface
		}
	}

	getAlertRef = (alert: AlertUtilities) => {
		if (alert) {
			this.setState({
				utilities: {
					...this.state.utilities,
					alert,
				}
			})
		}
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
					<React.Fragment>
						<HomePage utilities={ this.state.utilities } />
						<AlertUtilities ref={ this.getAlertRef } />
					</React.Fragment>
				) }
			</React.Fragment>
		)
	}
}

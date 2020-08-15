import React from 'react'
import { StackerModel } from '../../../app/models'

import Styles from './style'
import { Animated, ViewStyle, StyleProp } from 'react-native'


export type AlertUtilitiesInterface = {
	modal: AlertUtilities['modal']
	close: AlertUtilities['close']
}

export class AlertUtilities extends StackerModel {

	private renderComponent(data: ReturnType<StackerModel['data']>) {
		switch (data.data.type) {
			case 'MODAL':
			default:
				return data.data.component
		}
	}

	modal = ({
		component,
		overlayStyle,
		wrapperStyle,
		callback,
	}: {
		component: React.ClassicElement<any>
		overlayStyle?: StyleProp<ViewStyle>
		wrapperStyle?: StyleProp<ViewStyle>
		callback?: (id: number) => void
	}) => {
		this.add({
			overlayStyle,
			wrapperStyle,
			animationType: 'FLY_TO_TOP',
			data: {
				type: 'MODAL',
				component,
			},
		}, callback)
	}

	close = (...p: Parameters<StackerModel['remove']>) => {
		return this.remove(...p)
	}

	render() {
		const currentData = this.data()

		return (
			<React.Fragment>
				{ !!currentData && (
					<Animated.View accessible={false} style={[
						Styles.container,
						Styles.overlay,
						this.overlayAnimationInterpolation,
						currentData.overlayStyle,
					]} />
				) }
				{ this.state.stack.slice(0, this.config.stackSize).map(id => {
					const data = this.state.data[id]

					return (
						<Animated.View key={id} accessible={currentData.__id === id} style={[
							Styles.container,
							data.__animationInterpolation,
							data.wrapperStyle,
						]}>
							{ this.renderComponent(data) }
						</Animated.View>
					)
				}) }
			</React.Fragment>
		)
	}
}

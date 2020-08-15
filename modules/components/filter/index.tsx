import React from 'react'
import { Animated } from 'react-native'

import { Colors } from '../../../app/constants'
import { BoxBit, IconBit } from '../../bits'

import Styles from './styles'


type Props = {
	active: boolean
	onPress: () => void
	style?: object
}
type State = {}


export class FilterComponent extends React.Component<Props, State> {

	animation: Animated.CompositeAnimation | null = null

	closeAnimationValue = new Animated.Value(0)
	filterAnimationValue = new Animated.Value(1)

	closeAnimation = {
		opacity: this.closeAnimationValue,
		transform: [{
			rotate: this.closeAnimationValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['-90 deg', '0 deg']
			})
		}]
	}

	filterAnimation = {
		opacity: this.filterAnimationValue,
		transform: [{
			rotate: this.filterAnimationValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['90 deg', '0 deg']
			})
		}]
	}

	componentDidUpdate(nP: Props) {
		if (nP.active !== this.props.active) {
			this.animate()
		}
	}

	animate = () => {
		if (this.animation) {
			this.animation.stop()
		}

		this.animation = Animated.parallel([
			Animated.spring(this.closeAnimationValue, {
				toValue: this.props.active ? 1 : 0,
				useNativeDriver: true,
			}),
			Animated.spring(this.filterAnimationValue, {
				toValue: this.props.active ? 0 : 1,
				useNativeDriver: true,
			})
		])

		this.animation.start()
	}

	render() {
		return (
			<BoxBit onPress={ this.props.onPress } style={[ Styles.container, this.props.style ]}>
				<Animated.View style={[ Styles.content, this.closeAnimation ]}>
					<IconBit name="close" size={ 32 } color={ Colors.white } />
				</Animated.View>
				<Animated.View style={[ Styles.content, this.filterAnimation ]}>
					<IconBit name="filter" color={ Colors.white } />
				</Animated.View>
			</BoxBit>
		)
	}
}

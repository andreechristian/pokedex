import React from 'react'
import { Animated, LayoutChangeEvent } from 'react-native'

import { BoxBit } from '../../bits'

import Styles from './style'


type Props = {
	progress: number | Animated.Value
	style?: object
	barStyle?: object
}


export class ProgressComponent extends React.Component<Props, {}> {

	static defaultProps = {
		progress: 0,
	}

	width = 0
	animationValue = typeof this.props.progress === 'number' ? new Animated.Value(this.props.progress) : this.props.progress
	animation: Animated.CompositeAnimation | null = null
	// TODO
	animationInterpolation: any = {
		opacity: 0,
	}

	onLayout = (e: LayoutChangeEvent) => {
		this.width = e.nativeEvent.layout.width

		this.animationInterpolation = {
			transform: [{
				translateX: (-this.width / 2),
			}, {
				scaleX: this.animationValue.interpolate({
					inputRange: [0, 100],
					outputRange: [0, 1],
				}),
			}, {
				translateX: (this.width / 2),
			}],
		}

		this.forceUpdate()
	}

	componentDidUpdate(pP: Props) {
		if (pP.progress !== this.props.progress) {
			if (this.animation) {
				this.animation.stop()
			}

			this.animation = Animated.timing(this.animationValue, {
				toValue: this.props.progress,
				duration: 200,
				useNativeDriver: true,
			})

			this.animation.start()
		}
	}

	render() {
		return (
			<BoxBit onLayout={ this.onLayout } style={[Styles.container, this.props.style]}>
				<Animated.View style={[Styles.bar, this.animationInterpolation, this.props.barStyle]} />
			</BoxBit>
		)
	}
}

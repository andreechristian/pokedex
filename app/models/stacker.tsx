import React from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'


type Props = {}
type State = {
	stack: number[]
	data: {
		[key: number]: Config
	}
}
type AnimationCb = (p: {finished: boolean}) => void
type QueAdd = {
	type: 'ADDING'
	data: [Omit<Config, '__animationTiming' | '__animationValue' | '__animationInterpolation' | '__id'>, ((id: number) => void)?, AnimationCb?]
}
type QueRemove = {
	type: 'REMOVING'
	data: [number?, boolean?, boolean?]
}
type Interpolation = {
	opacity?: Animated.AnimatedInterpolation
	transform?: ({
		translateY?: Animated.AnimatedInterpolation
		translateX?: Animated.AnimatedInterpolation
		scaleY?: Animated.AnimatedInterpolation
		scaleX?: Animated.AnimatedInterpolation
		scale?: Animated.AnimatedInterpolation
	})[]
}
type Config = {
	__id: number
	__animationTiming: Animated.CompositeAnimation | null
	__animationValue: Animated.Value
	__animationInterpolation: Interpolation
	animationType: 'FLY_TO_TOP' | 'SHORT_FLY_TO_BOTTOM' | 'SCALE_OUT'
	overlayStyle?: StyleProp<ViewStyle>
	wrapperStyle?: StyleProp<ViewStyle>
	data: {
		[key: string]: any
	}
}


export class StackerModel extends React.Component<Props, State> {

	state = {
		stack: [],
		data: {},
	} as State

	private id = 1
	private overlayAnimation: Animated.CompositeAnimation | null = null
	private overlayAnimationState = 0
	private overlayAnimationValue = new Animated.Value(0)
	private queue: (QueAdd | QueRemove)[] = []
	private stackModifying = false

	protected overlayAnimationInterpolation = {
		opacity: this.overlayAnimationValue,
	}

	protected config = {
		animation: {
			duration: 100,
			ease: 'easeOut',
		},
		overlay: {
			duration: 100,
			ease: 'none',
		},
		animations: {
			FLY_TO_TOP(animationValue: Animated.Value) {
				return {
					opacity: animationValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, 1, 0],
					}),
					transform: [
						{
							translateY: animationValue.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [50, 0, 50],
							})
						},
					],
				}
			},
			SHORT_FLY_TO_BOTTOM(animationValue: Animated.Value) {
				return {
					opacity: animationValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, 1, 0],
					}),
					transform: [
						{
							translateY: animationValue.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [-10, 0, -10],
							})
						},
					],
				}
			},
			SCALE_OUT(animationValue: Animated.Value) {
				return {
					opacity: animationValue.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, 1, 0],
					}),
					transform: [
						{
							scale: animationValue.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [.7, 1, 1.15],
							})
						},
					],
				}
			}
		},
		swipeTreshold: 30,
		maxSwipeTreshold: 120,
		stackSize: 2,
	}

	protected data = () => {
		return this.state.data[this.state.stack[0]]
	}

	protected last = () => {
		return this.state.data[this.state.stack[1]]
	}

	private addToStack = (data: Omit<Config, '__id'>, cb: (id: number) => void) => {
		const id = this.id++

		this.setState({
			stack: [id, ...this.state.stack],
			data: {
				...this.state.data,
				[id]: {
					...data,
					__id: id,
				}
			},
		}, cb.bind(this, id))

		return id
	}

	private removeFromStack = (id: number, cb?: () => void) => {
		const index = this.state.stack.indexOf(id)

		if(index >= 0) {
			delete this.state.data[id]

			this.setState({
				stack: this.state.stack.filter(_id => _id !== id),
				data: this.state.data,
			}, cb)
		} else if (cb) {
			cb()
		}
	}

	private finishModifyStack = () => {
		this.stackModifying = false
		setImmediate(this.runQueue)
	}

	private runQueue = () => {
		if(this.queue.length) {
			const action = this.queue.shift()!

			switch(action.type) {
			case 'ADDING':
				this.add(...action.data)
				break
			case 'REMOVING':
				this.remove(...action.data)
				break
			}
		}
	}

	private animate(data: Config, to = 1, cb?: AnimationCb) {
		if (data.__animationTiming) {
			data.__animationTiming.stop()
		}

		data.__animationTiming = Animated.timing(data.__animationValue, {
			useNativeDriver: true,
			...this.config.animation,
			toValue: to,
		})

		data.__animationTiming.start(cb)
	}

	private animateOverlay(to: number) {
		if(
			(to === 1 && this.overlayAnimationState !== 1)
			|| (this.state.stack.length === 1 && to === 0)
		) {
			this.overlayAnimationState = to

			if (this.overlayAnimation) {
				this.overlayAnimation.stop()
			}

			this.overlayAnimation = Animated.timing(this.overlayAnimationValue, {
				useNativeDriver: true,
				...this.config.overlay,
				toValue: to,
			})

			this.overlayAnimation.start()
		}
	}

	protected add = <T extends Omit<Config, '__animationTiming' | '__animationValue' | '__animationInterpolation' | '__id'>>(data: T, cb?: (id: number) => void, cbAnimationDone?: AnimationCb, animateCurrent = true) => {
		if (this.stackModifying) {
			this.queue.push({
				type: 'ADDING',
				data: [data, cb, cbAnimationDone],
			})
		} else {
			this.stackModifying = true

			// perform animation
			const current = this.data()
			const animationValue = new Animated.Value(0)

			if (current && animateCurrent) {
				this.animate(current, 0)
			}

			this.animateOverlay(1)

			this.addToStack({
				__animationTiming: null,
				__animationValue: animationValue,
				__animationInterpolation: this.config.animations[data.animationType](animationValue),
				...data,
			}, id => {
				this.animate(this.data(), 1, cbAnimationDone)
				this.finishModifyStack()

				if (cb) {
					cb(id)
				}
			})
		}
	}

	protected remove = (id?: number, withoutAnimation = false, animateLast = true) => {
		if (this.stackModifying) {
			this.queue.push({
				type: 'REMOVING',
				data: [id, withoutAnimation, animateLast],
			})
		} else {
			this.stackModifying = true

			// perform animation
			const ID = id || this.state.stack[0]
			const current = this.data()
			const last = this.last()

			if (current) {
				if (current.__id === ID) {
					this.animateOverlay(0)
					if (withoutAnimation) {
						this.removeFromStack(ID, this.finishModifyStack)
					} else {
						this.animate(current, 2, (p: { finished: boolean }) => {
							if (p.finished) {
								this.removeFromStack(ID, this.finishModifyStack)
							}
						})
					}
				} else {
					this.removeFromStack(ID, this.finishModifyStack)
				}
			} else {
				this.finishModifyStack()
			}

			if (last && last.__id !== id && animateLast) {
				this.animate(last, 1)
			}
		}
	}
}

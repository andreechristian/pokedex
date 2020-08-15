import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import Styles from './styles'

function centering(center?: boolean | 'x' | 'y', row?: boolean) {
	switch(center) {
	case true:
		return Styles.centering
	case 'x':
		return row ? Styles.centerY : Styles.centerX
	case 'y':
		return row ? Styles.centerX : Styles.centerY
	default:
		return false
	}
}

export const BoxBit = (props: {
	accessible?: boolean
	row?: boolean
	flex?: boolean
	centering?: boolean | 'x' | 'y'
	onPress?: () => void
	onLayout?: React.ComponentProps<typeof View>['onLayout']
	children?: React.ReactNode
	style?: object
}) => {
	return props.onPress ? (
		<TouchableOpacity accessible={ props.accessible } onPress={ props.onPress } onLayout={ props.onLayout } style={[
			props.flex && Styles.flex,
			props.row && Styles.row,
			centering(props.centering, props.row),
			props.style
		]}>
			{ props.children }
		</TouchableOpacity>
	) : (
		<View accessible={ props.accessible } onLayout={ props.onLayout } style={[
			props.flex && Styles.flex,
			props.row && Styles.row,
			centering(props.centering, props.row),
			props.style
		]}>
			{ props.children }
		</View>
	)
}

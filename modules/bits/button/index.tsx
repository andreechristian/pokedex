import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { BoxBit } from '../box'

import Styles from './styles'


export const ButtonBit = (props: {
	title: string
	prefix?: React.ElementType
	disabled?: boolean
	onPress?: () => void
	style?: object
}) => {
	return (
		<BoxBit row centering="x" accessible={ !props.disabled } onPress={ props.onPress } style={[ Styles.button, props.disabled && Styles.disabled || false, props.style ]}>
			{ props.prefix }
			<Text style={[ Styles.title, props.prefix && Styles.prefix || false ]}>
				{ props.title }
			</Text>
		</BoxBit>
	)
}

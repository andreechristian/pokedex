import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Colors } from '../../../app/constants'


export const LoaderBit = (props: {
	color?: string
	style?: object
}) => {
	return (
		<ActivityIndicator color={ props.color || Colors.black } style={ props.style } />
	)
}

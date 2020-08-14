import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Colors } from '../../../app/constants'


export const LoaderComponent = (props: {
	color?: string
	style?: object
}) => {
	return (
		<ActivityIndicator color={ props.color || Colors.black } style={ props.style } />
	)
}
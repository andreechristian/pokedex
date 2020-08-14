import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

import { Colors } from '../../../app/constants'

import Styles from './styles'


export const IconComponent = (props: {
	name: string
	size?: number
	color?: string
	style?: object
}) => {
	return (
		<FontAwesome name={ props.name } size={ props.size || 24 } color={ props.color || Colors.black } style={ props.style } />
	)
}
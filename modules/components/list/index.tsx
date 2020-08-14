import React from 'react'
import { Text, View, PointPropType } from 'react-native'

import Styles from './styles'


export const ListComponent = (props: {
	title: string
	isActive: boolean
	style?: object
}) => {
	return (
		<View style={[ Styles.item, props.style ]}>
			<Text style={ Styles.title }>
				{ props.title }{ props.isActive ? 'A' : 'I' }
			</Text>
		</View>
	)
}
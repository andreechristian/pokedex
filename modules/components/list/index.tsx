import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import Styles from './styles'

export { HEIGHT as LIST_HEIGHT } from './styles'

export const ListComponent = (props: {
	id: number
	title: string
	active: boolean
	selected: boolean
	onPress?: () => void
	style?: object
}) => {
	return (
		<TouchableOpacity onPress={ props.onPress } style={[ Styles.item, props.style ]}>
			<Text style={ Styles.title }>
				{ props.id }{ props.title }{ props.active ? 'A' : 'I' }{ props.selected ? 'S' : 'U' }
			</Text>
		</TouchableOpacity>
	)
}
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { BoxBit, TextBit } from '../../bits'
import { Type, Colors } from '../../../app/constants'

import Styles from './styles'
import { CommonHelper } from '../../../app/helpers'

function color(type?: Type) {
	switch(type) {
	case 'normal':
	case 'fighting':
	case 'steel':
		return Colors.grey
	case 'flying':
	case 'water':
	case 'ice':
		return Colors.blue
	case 'poison':
	case 'grass':
	case 'dragon':
	case 'fairy':
		return Colors.green
	case 'ground':
	case 'rock':
		return Colors.brown
	case 'bug':
	case 'fire':
		return Colors.red
	case 'electric':
	case 'psychic':
		return Colors.yellow
	case 'ghost':
	case 'dark':
	case 'shadow':
		return Colors.purple
	case 'unknown':
	default:
		return Colors.white
	}
}


export { HEIGHT as LIST_HEIGHT } from './styles'

export const ListComponent = (props: {
	id: number
	title: string
	type?: Type
	active: boolean
	selected: boolean
	small:  boolean
	onPress?: () => void
	style?: object
}) => {
	return (
		<BoxBit onPress={ props.onPress } style={ props.style }>
			<BoxBit style={[ Styles.item, props.selected ? {
				backgroundColor: color(props.type)
			} : undefined ]}>
				<TextBit weight="semibold" size="header" style={[ Styles.title, {
					color: props.selected ? Colors.black : color(props.type),
				}]} ellipsis="tail" lines={ 1 }>
					{ props.small ? props.title.charAt(0).toUpperCase() : CommonHelper.capitalize(props.title) }
				</TextBit>
			</BoxBit>
			<BoxBit style={ Styles.shadow } />
		</BoxBit>
	)
}

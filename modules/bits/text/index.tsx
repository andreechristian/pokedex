import React from 'react'
import { Text } from 'react-native'

import Styles from './styles'

function weight(w: 'normal' | 'light' | 'semibold' | 'bold' | 'extrabold' | 'italic') {
	switch(w) {
	case 'normal':
		return Styles.normal
	case 'light':
		return Styles.light
	case 'semibold':
		return Styles.semibold
	case 'bold':
		return Styles.bold
	case 'extrabold':
		return Styles.extrabold
	case 'italic':
		return Styles.italic
	default:
		return false
	}
}

function size(s: 'header' | 'subheader' | 'hero' | 'p1' | 'p2' | 'caption') {
	switch (s) {
		case 'header':
			return Styles.header
		case 'subheader':
			return Styles.subheader
		case 'hero':
			return Styles.hero
		case 'p1':
			return Styles.p1
		case 'p2':
			return Styles.p2
		case 'caption':
			return Styles.caption
		default:
			return false
	}
}

export const TextBit = (props: {
	weight?: 'normal' | 'light' | 'semibold' | 'bold' | 'extrabold' | 'italic'
	size?: 'header' | 'subheader' | 'hero' | 'p1' | 'p2' | 'caption'
	ellipsis?: React.ComponentProps<typeof Text>['ellipsizeMode']
	lines?: number
	onPress?: () => void
	children?: React.ReactNode
	style?: object
}) => {
	return (
		<Text ellipsizeMode={ props.ellipsis } numberOfLines={ props.ellipsis ? props.lines || 1 : undefined } onPress={ props.onPress } style={[ weight(props.weight || 'normal'), size(props.size || 'p1'), props.style ]}>
			{ props.children }
		</Text>
	)
}

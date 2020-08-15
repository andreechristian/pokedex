import React from 'react'
import { Image } from 'react-native'

import { BoxBit } from '../box'

import Styles from './styles'

export const ImageBit = (props: {
	accessible?: boolean
	source: React.ComponentProps<typeof Image>['source'] | string
	resize?: React.ComponentProps<typeof Image>['resizeMode']
	flex?: boolean
	onPress?: () => void
	style?: object
}) => {
	return (
		<BoxBit accessible={ props.accessible } flex={ props.flex } onPress={ props.onPress } style={ props.style }>
			<Image source={ typeof props.source === 'string' ? {
				uri: props.source
			} : props.source } resizeMode={ props.resize } style={ Styles.image } />
		</BoxBit>
	)
}

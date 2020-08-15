import React from 'react'
import { Text, TouchableOpacity, ScrollView } from 'react-native'

import { Type, Colors } from '../../../app/constants'
import { BoxBit, IconBit } from '../../bits'

import Styles from './styles'
import { CommonHelper } from '../../../app/helpers'


type Props = {
	types: Type[]
	type?: Type
	onSelect: (t?: Type) => void
	onClose: () => void
}
type State = {}


export class MenuComponent extends React.Component<Props, State> {

	static defaultProps = {
		types: ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow']
	}

	typeRenderer = (type?: Type) => {
		const isSelected = type === this.props.type
		return (
			<BoxBit row centering="x" onPress={ this.props.onSelect.bind(this, type) } style={[ Styles.type, isSelected && Styles.active ]}>
				<Text style={ Styles.title }>{ type ? CommonHelper.capitalize(type) : 'None' }</Text>
				<IconBit name={ isSelected ? "circle" : "circle-o" } color={ isSelected ? Colors.opacity(Colors.black, .6) : undefined } />
			</BoxBit>
		)
	}

	render() {
		return (
			<React.Fragment>
				<BoxBit flex />
				<BoxBit style={ Styles.container }>
					<BoxBit row centering="x" style={ Styles.header }>
						<Text>Select Type</Text>
						<BoxBit centering onPress={ this.props.onClose }>
							<IconBit
								name="close"
							/>
						</BoxBit>
					</BoxBit>
					<ScrollView style={ Styles.content }>
						{ this.typeRenderer() }
						{ this.props.types.map(this.typeRenderer) }
					</ScrollView>
				</BoxBit>
			</React.Fragment>
		)
	}
}

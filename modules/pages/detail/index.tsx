import React from 'react'
import { Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'


import { Type, Colors, Pokemon, Stat } from '../../../app/constants'
import { BoxBit, IconBit, TextBit, LoaderBit, ImageBit } from '../../bits'

import Styles from './styles'
import { ProgressComponent } from '../../components'
import { PokemonService } from '../../../app/services'
import { CommonHelper } from '../../../app/helpers'

const icons = {
	// tslint:disable-next-line: no-var-requires
	bug: require('../../../assets/icons/bug.png'),
	// tslint:disable-next-line: no-var-requires
	dark: require('../../../assets/icons/dark.png'),
	// tslint:disable-next-line: no-var-requires
	dragon: require('../../../assets/icons/dragon.png'),
	// tslint:disable-next-line: no-var-requires
	electric: require('../../../assets/icons/electric.png'),
	// tslint:disable-next-line: no-var-requires
	fairy: require('../../../assets/icons/fairy.png'),
	// tslint:disable-next-line: no-var-requires
	fighting: require('../../../assets/icons/fighting.png'),
	// tslint:disable-next-line: no-var-requires
	fire: require('../../../assets/icons/fire.png'),
	// tslint:disable-next-line: no-var-requires
	flying: require('../../../assets/icons/flying.png'),
	// tslint:disable-next-line: no-var-requires
	ghost: require('../../../assets/icons/ghost.png'),
	// tslint:disable-next-line: no-var-requires
	grass: require('../../../assets/icons/grass.png'),
	// tslint:disable-next-line: no-var-requires
	ground: require('../../../assets/icons/ground.png'),
	// tslint:disable-next-line: no-var-requires
	ice: require('../../../assets/icons/ice.png'),
	// tslint:disable-next-line: no-var-requires
	normal: require('../../../assets/icons/normal.png'),
	// tslint:disable-next-line: no-var-requires
	poison: require('../../../assets/icons/poison.png'),
	// tslint:disable-next-line: no-var-requires
	psychic: require('../../../assets/icons/psychic.png'),
	// tslint:disable-next-line: no-var-requires
	rock: require('../../../assets/icons/rock.png'),
	// tslint:disable-next-line: no-var-requires
	steel: require('../../../assets/icons/steel.png'),
	// tslint:disable-next-line: no-var-requires
	water: require('../../../assets/icons/water.png'),
	unknown: false,
	shadow: false,
}


type Props = {
	id: number
	onLoaded: (p: Pokemon) => void
	onError: (err: Error) => void
}
type State = {
	isLoading: boolean
	data: Pokemon
}


export class DetailPage extends React.Component<Props, State> {

	state = {
		isLoading: true,
		data: {},
	} as State

	shouldComponentUpdate(nP: Props, nS: State) {
		return nP.id !== this.props.id || nS.isLoading !== this.state.isLoading
	}

	componentDidMount() {
		this.getData()
	}

	componentDidUpdate(nP: Props) {
		if (nP.id !== this.props.id) {
			this.getData()
		}
	}

	getData = () => {
		this.setState({
			isLoading: true,
		})

		const {
			id
		} = this.props

		PokemonService.get(id).then(pokemon => {
			// Handle overlapping request
			if (this.props.id === id) {
				this.setState({
					isLoading: false,
					data: pokemon,
				})

				this.props.onLoaded(pokemon)
			} else {
				// There is a newer id
			}
		}).catch(this.props.onError)
	}

	baseRenderer = (title: string, value: number) => {
		return (
			<BoxBit row centering="x" style={ Styles.base }>
				<BoxBit>
					<TextBit weight="bold" size="p1">{ value } </TextBit>
					<TextBit weight="light" size="p2">{ title }</TextBit>
				</BoxBit>
			</BoxBit>
		)
	}

	iconRenderer = (type: Type) => {
		return icons[type] ? (
			<ImageBit source={ icons[type] } style={ Styles.icon } />
		) : false
	}

	statRenderer = (stat: Stat) => {
		return (
			<BoxBit style={ Styles.status }>
				<BoxBit row centering="x">
					<TextBit weight="extrabold" size="caption">{ stat.key.split('-').join(' ').toUpperCase() }</TextBit>
					<BoxBit flex />
					<TextBit weight="light" size="caption" style={ Styles.stat }>{ stat.value }</TextBit>
				</BoxBit>
				<ProgressComponent progress={ Math.min(100, Math.ceil(stat.value / 150 * 100)) } barStyle={ Styles.bar } style={ Styles.progress } />
			</BoxBit>
		)
	}

	render() {
		return this.state.isLoading ? (
			// TODO: Loading indicator
			<BoxBit centering flex style={ Styles.container }>
				<LoaderBit />
			</BoxBit>
		) : (
			<SafeAreaView style={ Styles.container }>
				<ScrollView contentContainerStyle={ Styles.content }>
					<ImageBit key={ this.state.data.id } source={ this.state.data.image } style={ Styles.image } />
					<TextBit weight="bold" size="p1" style={ Styles.sub }>#{ String(this.state.data.id).padStart(5, '000') }</TextBit>
					<TextBit weight="bold" size="hero">{ CommonHelper.capitalize(this.state.data.name) }</TextBit>

					<BoxBit row style={ Styles.icons }>
						{ this.state.data.types.map(this.iconRenderer) }
					</BoxBit>

					<BoxBit style={ Styles.bases }>
						{ this.baseRenderer('Base experience', this.state.data.baseExperience) }
						{ this.baseRenderer('Height', this.state.data.height) }
						{ this.baseRenderer('Weight', this.state.data.weight) }
					</BoxBit>

					<BoxBit style={ Styles.bases }>
						{ this.state.data.stats.map(this.statRenderer) }
					</BoxBit>
				</ScrollView>
			</SafeAreaView>
		)
	}
}

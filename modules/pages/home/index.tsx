import React from 'react'
import { View, VirtualizedList, ListRenderItemInfo } from 'react-native'

import { ListComponent, LIST_HEIGHT, FilterComponent } from '../../components'
import { LoaderBit, ButtonBit, BoxBit, TextBit } from '../../bits'

import Styles from './style'
import { Type, Sizes, Pokemon } from '../../../app/constants'
import { PokemonService } from '../../../app/services'
import { AlertUtilitiesInterface } from '../../utilities'
import { MenuComponent } from '../../components/menu'
import { DetailPage } from '../detail'
import { CommonHelper } from '../../../app/helpers'
import { NotificationComponent } from '../../components/notification'


type List = {
	id: number
	name: string
	type: Type
}

type Props = {
	utilities: {
		alert: AlertUtilitiesInterface
	}
}

type State = {
	isLoading: boolean
	actives: number[]
	activeIndex: number
	updater: number
	offset: number
	count: number
	total: number
	data: List[]
	filter?: Type
}

// const DATA: list[] = Array(500).fill(undefined).map((u, i) => {
// 	return {
// 		id: Math.random(),
// 		title: `Item ${ i + 1 }`
// 	}
// })

export class HomePage extends React.Component<Props, State> {

	state: State = {
		isLoading: false,
		// actives: DATA.slice(0, Math.floor(Sizes.screen.height / LIST_HEIGHT)).map(d => d.id),
		actives: [],
		updater: 1,
		activeIndex: -1,
		offset: 0,
		count: 100,
		total: Infinity,
		data: [],
		filter: undefined,
	}

	config = {
		waitForInteraction: true,
		itemVisiblePercentThreshold: 10,
	}

	componentDidMount() {
		this.getData()
	}

	componentDidUpdate(nP: Props, nS: State) {
		if (
			nS.offset !== this.state.offset
			|| nS.filter !== this.state.filter
		) {
			this.getData()
		}
	}

	keyer = (item: List) => String(item.id)

	getData = () => {
		// Block other request
		if (!this.state.isLoading) {
			this.state.isLoading = true

			const {
				offset,
				count,
				filter,
			} = this.state

			Promise.resolve().then(() => {
				if (filter) {
					this.setState({
						data: [],
					})

					return PokemonService.listByFilter(filter).then(result => {
						this.setState({
							data: result.data,
							total: result.count,
							actives: result.data.slice(0, Math.floor(Sizes.screen.height / LIST_HEIGHT)).map(d => d.id),
							isLoading: false,
						})
					})
				} else {
					// Update loading indicator
					this.forceUpdate()

					return PokemonService.listByOffset(offset, count).then(result => {
						this.setState({
							data: offset === 0 ? result.data : [...this.state.data, ...result.data],
							total: result.count,
							actives: this.state.data.length ? this.state.actives : result.data.slice(0, Math.floor(Sizes.screen.height / LIST_HEIGHT)).map(d => d.id),
							isLoading: false,
						})
					})
				}
			}).catch(err => {
				// tslint:disable-next-line: no-console
				console.warn(err)

				this.props.utilities.alert.modal({
					component: (
						<NotificationComponent
							message="Oops… cannot load data. Please try again later."
							onClose={() => this.props.utilities.alert.close()}
						/>
					)
				})

				this.setState({
					isLoading: false,
				})
			})
		}
	}

	getItemCount = (items: List[]) => items && items.length

	getItem = (items: List[], index: number) => items[index]

	onSelect = (activeIndex: number) => {
		this.setState({
			activeIndex: activeIndex === this.state.activeIndex ? -1 : activeIndex,
			updater: this.state.updater + 1,
		})
	}

	onSelectType = (type?: Type) => {
		this.setState({
			filter: type,
			offset: 0,
		})

		this.props.utilities.alert.close()
	}

	onViewableChanged: React.ComponentProps<typeof VirtualizedList>['onViewableItemsChanged'] = viewable => {
		this.setState({
			actives: viewable.viewableItems.map(i => i.item.id)
		})
	}

	onEndReached = () => {
		if (this.state.total > this.state.data.length && !this.state.isLoading) {
			this.setState({
				offset: this.state.data.length,
			})
		}
	}

	onShowFilter = () => {
		if (this.state.activeIndex === -1) {
			this.props.utilities.alert.modal({
				component: (
					<MenuComponent
						// types
						type={ this.state.filter }
						onClose={ () => this.props.utilities.alert.close() }
						onSelect={  this.onSelectType }
					/>
				)
			})
		} else {
			this.setState({
				activeIndex: -1,
				updater: this.state.updater + 1,
			})
		}
	}

	onErrorLoadingDetail = () => {
		this.props.utilities.alert.modal({
			component: (
				<NotificationComponent
					message="Oops… cannot load detail. Please try again later."
					onClose={() => this.props.utilities.alert.close()}
				/>
			)
		})

		this.setState({
			activeIndex: -1,
			updater: this.state.updater + 1,
		})
	}

	onPokemonLoaded = (pokemon: Pokemon) => {
		// Dangerously inject type
		this.state.data[this.state.activeIndex].type = pokemon.types.pop()!

		this.setState({
			updater: this.state.updater + 1,
		})
	}

	listRenderer = (data: ListRenderItemInfo<List>) => {
		return (
			<ListComponent
				key={ data.item.id }
				id={ data.item.id }
				title={ data.item.name }
				type={ data.item.type }
				active={ this.state.actives.indexOf(data.item.id) > -1 }
				selected={ this.state.activeIndex === data.index }
				small={ this.state.activeIndex !== -1 }
				onPress={ this.onSelect.bind(this, data.index) }
				style={ Styles.item }
			/>
		)
	}

	loadingRenderer = () => {
		return this.state.isLoading ? (
			<LoaderBit />
		) : null
	}

	render() {
		const isActive = this.state.activeIndex !== -1

		return (
			<BoxBit row flex style={ Styles.container }>
				<BoxBit flex style={ isActive ? Styles.detail : Styles.none }>
					{ isActive ? (
						<DetailPage
							id={ this.state.data[this.state.activeIndex].id }
							onLoaded={ this.onPokemonLoaded }
							onError={ this.onErrorLoadingDetail }
						/>
					) : false }
				</BoxBit>
				<BoxBit style={ isActive ? Styles.navigation : Styles.full }>
					<BoxBit row style={ Styles.header}>
						{ isActive ? (
							<BoxBit flex />
						) : (
							<BoxBit flex>
								<TextBit size="hero" weight="bold" style={ Styles.title }>Pokédex</TextBit>
								<TextBit size="p1" weight="bold" style={ Styles.title }>{ this.state.filter ? `${ CommonHelper.capitalize(this.state.filter) } Pokemons` : 'All Pokemons' } ({ this.state.total })</TextBit>
							</BoxBit>
						) }
						<FilterComponent active={ isActive } onPress={ this.onShowFilter } style={ Styles.filter } />
					</BoxBit>
					<VirtualizedList
						keyExtractor={ this.keyer }
						data={ this.state.data }
						extraData={ this.state.updater }
						viewabilityConfig={ this.config }
						onEndReachedThreshold={ .5 }
						getItemCount={ this.getItemCount }
						getItem={ this.getItem }
						onViewableItemsChanged={ this.onViewableChanged }
						onEndReached={ this.onEndReached }
						renderItem={ this.listRenderer }
						ListFooterComponent={ this.loadingRenderer }
					/>
				</BoxBit>
			</BoxBit>
		)
	}
}

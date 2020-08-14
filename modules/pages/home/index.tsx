import React from 'react'
import { View, VirtualizedList, ListRenderItemInfo } from 'react-native'

import { ListComponent, LIST_HEIGHT, LoaderComponent } from '../../components'

import Styles from './style'
import { Type, Sizes } from '../../../app/constants'
import { PokemonService } from '../../../app/services'
import { hideAsync } from 'expo/build/launch/SplashScreen'


type List = {
	id: number,
	name: string,
	type: Type,
}

type Props = {}

type State = {
	isLoading: boolean,
	actives: number[],
	activeIndex: number,
	offset: number,
	count: number,
	total: number,
	data: List[],
	filter: Type | null,
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
		activeIndex: -1,
		offset: 0,
		count: 100,
		total: Infinity,
		data: [],
		filter: null,
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
		this.setState({
			isLoading: true,
		})

		const {
			offset,
			count,
			filter,
		} = this.state

		Promise.resolve().then(() => {
			if (filter) {
				return PokemonService.listByFilter(filter)
			} else {
				return PokemonService.listByOffset(offset, count)
			}
		}).then(result => {
			this.setState({
				data: [...this.state.data, ...result.data],
				total: result.count,
				actives: this.state.data.length ? this.state.actives : result.data.slice(0, Math.floor(Sizes.screen.height / LIST_HEIGHT)).map(d => d.id) ,
				isLoading: false,
			})
		}).catch(err => {
			// TODO: Display Notification

			this.setState({
				isLoading: false,
			})
		})

	}

	getItemCount = (items: List[]) => items.length

	getItem = (items: List[], index: number) => items[index]

	onSelect = (activeIndex: number) => {
		this.setState({
			activeIndex,
		})
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

	listRenderer = (data: ListRenderItemInfo<List>) => {
		return (
			<ListComponent
				id={ data.item.id }
				title={ data.item.name }
				active={ this.state.actives.indexOf(data.item.id) > -1 }
				selected={ this.state.activeIndex === data.index}
				onPress={ this.onSelect.bind(this, data.index) }
				style={ Styles.item }
			/>
		)
	}

	loadingRenderer = () => {
		return this.state.isLoading ? (
			<LoaderComponent />
		) : null
	}

	render() {
		return (
			<View style={ Styles.container }>
				{/* <Text>Open up App.tsx to start working on your app!</Text> */}
				<VirtualizedList
					keyExtractor={ this.keyer }
					data={ this.state.data }
					extraData={ this.state.activeIndex }
					viewabilityConfig={ this.config }
					onEndReachedThreshold={ .5 }
					getItemCount={ this.getItemCount }
					getItem={ this.getItem }
					onViewableItemsChanged={ this.onViewableChanged }
					onEndReached={ this.onEndReached }
					renderItem={ this.listRenderer }
					ListFooterComponent={ this.loadingRenderer }
				/>
			</View>
		)
	}
}

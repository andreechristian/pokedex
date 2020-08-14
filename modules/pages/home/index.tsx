import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, VirtualizedList, ListRenderItemInfo } from 'react-native'

import { ListComponent } from '../../components'

import Styles from './style'


type data = {
	id: string,
	title: string,
}

const DATA: data[] = Array(500).fill(undefined).map((u, i) => {
	return {
		id: Math.random().toString(12).substring(0),
		title: `Item ${i + 1}`
	}
})


export class HomePage extends React.Component {

	state = {
		actives: [] as string[],
	}

	config = {
		waitForInteraction: true,
		itemVisiblePercentThreshold: 10,
	}

	keyer = (item: data) => item.id

	getItemCount = (items: typeof DATA) => items.length

	getItem = (items: typeof DATA, index: number) => items[index]

	onViewableChanged: React.ComponentProps<typeof VirtualizedList>['onViewableItemsChanged'] = viewable => {
		this.setState({
			actives: viewable.viewableItems.map(i => i.key)
		})
	}

	listRenderer = (list: ListRenderItemInfo<data>) => {
		return (
			<ListComponent
				isActive={ this.state.actives.indexOf(list.item.id) > -1 }
				title={ list.item.title }
				style={ Styles.item }
			/>
		)
	}

	render() {
		return (
			<View style={ Styles.container }>
				{/* <Text>Open up App.tsx to start working on your app!</Text> */}
				<VirtualizedList
					data={ DATA }
					initialNumToRender={ 4 }
					renderItem={ this.listRenderer }
					keyExtractor={ this.keyer }
					getItemCount={ this.getItemCount }
					getItem={ this.getItem }
					viewabilityConfig={ this.config }
					onViewableItemsChanged={ this.onViewableChanged }
				/>
				<StatusBar style="auto" />
			</View>
		)
	}
}

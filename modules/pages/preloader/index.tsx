import React from 'react'

import { AppLoading } from 'expo'
import { loadAsync } from 'expo-font'
import { Asset } from 'expo-asset'
import { FontAwesome } from '@expo/vector-icons'
import { Image, View, Text, TouchableOpacity } from 'react-native'

import { ButtonBit } from '../../bits'

import Styles from './style'

// **
// https://docs.expo.io/guides/preloading-and-caching-assets/
// **

type Props = {
	onReady: () => void
}

type State = {
	error: Error | null
	retry: number
}

const ASSETS = [
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/bug.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/dark.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/dragon.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/electric.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/fairy.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/fighting.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/fire.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/flying.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/ghost.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/grass.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/ground.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/ice.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/normal.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/poison.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/psychic.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/rock.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/steel.png'),
	// tslint:disable-next-line: no-var-requires
	require('../../../assets/icons/water.png'),
]

const FONTS = [
	FontAwesome.font,
	{
		'OpenSans-light': require('../../../assets/fonts/OpenSans-Light.ttf'),
		'OpenSans-regular': require('../../../assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-italic': require('../../../assets/fonts/OpenSans-Italic.ttf'),
		'OpenSans-semibold': require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
		'OpenSans-bold': require('../../../assets/fonts/OpenSans-SemiBold.ttf'),
		'OpenSans-extrabold': require('../../../assets/fonts/OpenSans-ExtraBold.ttf'),
	},
	// { 'name' : 'source' }
]


export class PreloaderPage extends React.Component<Props, State> {

	state: State = {
		error: null,
		retry: 1,
	}

	cacheImages = (images: any[]) => {
		return images.map(image => {
			if (typeof image === 'string') {
				return Image.prefetch(image)
			} else {
				return Asset.fromModule(image).downloadAsync()
			}
		})
	}

	cacheFonts = (fonts: {
		[key: string]: string
	}[]) => {
		return fonts.map(font => loadAsync(font))
	}

	onStartAsync = async () => {
		const imageAssets = this.cacheImages(ASSETS)
		const fontAssets = this.cacheFonts(FONTS)

		await Promise.all([...imageAssets, ...fontAssets])
	}

	onFinish = () => {
		this.props.onReady()
	}

	onError = (err: Error) => {
		this.setState({
			error: err,
		})
	}

	onRetry = () => {
		this.setState({
			error: null,
			retry: this.state.retry + 1,
		})
	}

	render() {
		return this.state.error ? (
			<View style={ Styles.container }>
				<Text>Oops… failed to load data</Text>
				<ButtonBit title="retry" onPress={ this.onRetry } style={ Styles.button } />
			</View>
		) : (
			<AppLoading key={ this.state.retry }
				startAsync={ this.onStartAsync }
				onFinish={ this.onFinish }
				onError={ this.onError }
			/>
		)
	}
}

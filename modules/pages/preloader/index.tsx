import React from 'react'

import { AppLoading } from 'expo'
import { loadAsync } from 'expo-font'
import { Asset } from 'expo-asset'
import { FontAwesome } from '@expo/vector-icons'
import { Image, View, Text, TouchableOpacity } from 'react-native'

import { ButtonComponent } from '../../components'

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
	'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
	// require('./assets/images/circle.jpg'),
]

const FONTS = [
	FontAwesome.font,
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
				<ButtonComponent title="retry" onPress={ this.onRetry } style={ Styles.button } />
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
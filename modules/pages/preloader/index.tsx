import React from 'react'

import { AppLoading } from 'expo'
import { loadAsync } from 'expo-font'
import { Asset } from 'expo-asset'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'react-native'


// **
// https://docs.expo.io/guides/preloading-and-caching-assets/
// **

const ASSETS = [

]

const FONTS = [

]


export class PreloaderPage extends React.Component<{
	onReady: () => void
	onError: (err: Error) => void
}, {}> {

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
		const imageAssets = this.cacheImages([
			'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
			// require('./assets/images/circle.jpg'),
		])

		const fontAssets = this.cacheFonts([
			FontAwesome.font
		])

		await Promise.all([...imageAssets, ...fontAssets])
	}

	onFinish = () => {
		this.props.onReady()
	}

	render() {
		return (
			<AppLoading
				startAsync={ this.onStartAsync }
				onFinish={ this.onFinish }
				onError={ this.props.onError }
			/>
		)
	}
}
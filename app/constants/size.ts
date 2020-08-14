import { Dimensions } from 'react-native'

export namespace Sizes {

	export const margin = {
		pad: 4,
		half: 8,
		compact: 12,
		default: 16,
		thick: 24,
	}

	export const app = {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
	}

	export const screen = {
		height: Dimensions.get('screen').height,
		width: Dimensions.get('screen').width,
	}

}

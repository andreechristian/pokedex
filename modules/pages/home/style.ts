import { StyleSheet } from "react-native"
import Constants from 'expo-constants'

import { Colors, Sizes } from "../../../app/constants"


export default StyleSheet.create({

	container: {
		flex: 1,
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: Colors.black,
	},

	header: {
		paddingTop: Constants.statusBarHeight + Sizes.margin.compact,
		paddingBottom: Sizes.margin.compact,
		backgroundColor: Colors.black,
	},

	title: {
		color: Colors.white,
		marginLeft: Sizes.margin.default,
		// alignSelf: 'flex-end'
	},

	filter: {
		marginHorizontal: Sizes.margin.compact,
	},

	item: {
		marginVertical: 8,
		marginHorizontal: 16,
	},

	full: {
		width: Sizes.app.width,
		// marginTop: Constants.statusBarHeight,
	},

	detail: {
		width: Sizes.app.width - 88,
	},

	navigation: {
		width: 88,
		// marginTop: Constants.statusBarHeight,
	},

	none: {
		width: 0,
	}

})

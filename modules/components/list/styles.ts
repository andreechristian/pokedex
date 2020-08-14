import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export const HEIGHT = 150

export default StyleSheet.create({

	item: {
		backgroundColor: Colors.opacity(Colors.yellow, .9),
		height: HEIGHT,
		justifyContent: 'center',
		padding: Sizes.margin.default,
	},

	title: {
		fontSize: 32,
	},

})

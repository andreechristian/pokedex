import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export default StyleSheet.create({

	item: {
		backgroundColor: Colors.opacity(Colors.yellow, .9),
		height: 150,
		justifyContent: 'center',
		padding: Sizes.margin.default,
	},

	title: {
		fontSize: 32,
	},

})

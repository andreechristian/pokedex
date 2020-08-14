import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export default StyleSheet.create({

	button: {
		backgroundColor: Colors.opacity(Colors.blue, .9),
		height: 50,
		justifyContent: 'center',
		padding: Sizes.margin.default,
	},

	title: {
		fontSize: 21,
	},

	disabled: {
		backgroundColor: Colors.opacity(Colors.blue, .3),
	},

})

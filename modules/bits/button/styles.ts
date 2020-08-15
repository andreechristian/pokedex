import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export default StyleSheet.create({

	button: {
		backgroundColor: Colors.opacity(Colors.blue, .9),
		padding: Sizes.margin.default,
	},

	title: {
		fontSize: 21,
		lineHeight: 28,
		fontFamily: 'OpenSans-extrabold',
	},

	disabled: {
		backgroundColor: Colors.opacity(Colors.blue, .3),
	},

	prefix: {
		marginLeft: Sizes.margin.half,
	},

})

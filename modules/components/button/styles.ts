import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export default StyleSheet.create({

	button: {
		flexDirection: 'row',
		backgroundColor: Colors.opacity(Colors.blue, .9),
		justifyContent: 'center',
		padding: Sizes.margin.default,
	},

	title: {
		fontSize: 21,
		lineHeight: 28,
	},

	disabled: {
		backgroundColor: Colors.opacity(Colors.blue, .3),
	},

	prefix: {
		marginLeft: Sizes.margin.half,
	},

})

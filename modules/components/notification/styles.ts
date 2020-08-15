import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"


export default StyleSheet.create({

	container: {
		backgroundColor: Colors.red,
		borderRadius: 6,
		margin: Sizes.margin.thick,
	},

	content: {
		paddingHorizontal: Sizes.margin.default,
		paddingVertical: Sizes.margin.thick,
		borderRightWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.white,
	},

	text: {
		color: Colors.white,
	},

	icon: {
		paddingHorizontal: Sizes.margin.default,
	},

})

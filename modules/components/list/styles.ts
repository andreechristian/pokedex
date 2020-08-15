import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export const HEIGHT = 60

export default StyleSheet.create({

	item: {
		backgroundColor: Colors.darkgrey,
		height: HEIGHT,
		justifyContent: 'center',
		padding: Sizes.margin.default,
		borderRadius: 18,
		zIndex: 1,
	},

	shadow: {
		backgroundColor: Colors.blackest,
		borderRadius: 18,
		height: HEIGHT,
		// width: ,
		// marginLeft: '5%',
		marginTop: -HEIGHT + 4,
	},

	title: {
		textAlign: 'center',
		// fontSize: 32,
	},

})

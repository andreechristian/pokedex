import { StyleSheet } from "react-native"
import { Colors } from "../../../app/constants"

export default StyleSheet.create({

	container: {
		width: 64,
		height: 64,
		// backgroundColor: Colors.purple,
		borderRadius: 20,
	},

	content: {
		width: 64,
		height: 64,
		position: 'absolute',
		top: 0,
		left: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

})

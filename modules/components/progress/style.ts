import { StyleSheet } from "react-native"
import { Colors } from "../../../app/constants"


export default StyleSheet.create({
	container: {
		height: 4,
		overflow: 'hidden',
		backgroundColor: Colors.black,
	},

	bar: {
		height: 4,
		backgroundColor: Colors.opacity(Colors.green, .8),
	},
})

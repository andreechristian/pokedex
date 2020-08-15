import { StyleSheet } from "react-native"
import { Colors } from "../../../app/constants"



export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},

	overlay: {
		backgroundColor: Colors.opacity(Colors.black, .5),
	},
})

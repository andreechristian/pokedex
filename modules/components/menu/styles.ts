import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"

export default StyleSheet.create({

	container: {
		height: (7 * 44) + 45, // List count * height + header height
	},

	header: {
		paddingVertical: Sizes.margin.compact,
		paddingHorizontal: Sizes.margin.thick,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
		backgroundColor: Colors.white,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.opacity(Colors.black, .16),
		justifyContent: 'space-between',
	},

	content: {
		backgroundColor: Colors.white,
	},

	type: {
		paddingVertical: Sizes.margin.half,
		paddingHorizontal: Sizes.margin.thick,
		justifyContent: 'space-between',
	},

	active: {
		backgroundColor: Colors.opacity(Colors.black, .1),
	},

	title: {
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: .4,
	}

})

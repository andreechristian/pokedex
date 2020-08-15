import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../../app/constants"


const width = Sizes.app.width - 88 - (Sizes.margin.thick * 2)


export default StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},

	content: {
		paddingLeft: Sizes.margin.thick,
		paddingRight: Sizes.margin.thick,
	},

	image: {
		width,
		height: width,
	},

	sub: {
		marginTop: Sizes.margin.half,
		marginBottom: Sizes.margin.pad,
		color: Colors.opacity(Colors.black, .3),
	},

	bases: {
		marginTop: Sizes.margin.default,
	},

	icons: {
		position: 'absolute',
		right: Sizes.margin.default,
		top: Sizes.margin.default,
	},

	icon: {
		width: 36,
		height: 36,
		marginLeft: Sizes.margin.pad,
	},

	base: {
		marginTop: Sizes.margin.half,

	},

	box: {
		borderRadius: 12,
		width: 52,
		height: 52,
		marginRight: Sizes.margin.half,
	},

	status: {
		marginTop: Sizes.margin.compact,
	},

	// title: {
	// 	width: 44,
	// 	textAlign: 'right',
	// 	marginRight: Sizes.margin.half,
	// },

	progress: {
		marginTop: Sizes.margin.pad,
		width,
		height: 8,
		borderRadius: 4,
	},

	bar: {
		height: 8,
	},

	stat: {

	},

})

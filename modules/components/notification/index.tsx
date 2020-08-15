import React from 'react'

import { Colors } from '../../../app/constants'
import { BoxBit, IconBit, TextBit } from '../../bits'

import Styles from './styles'


type Props = {
	timeout?: number
	message: string
	onClose: () => void
}
type State = {}


export class NotificationComponent extends React.Component<Props, State> {

	mounted: boolean = false
	timeout: number = 0

	componentDidMount() {
		this.mounted = true

		this.timeout = setTimeout(this.props.onClose, this.props.timeout || 300000)
	}

	componentWillUnmount() {
		this.mounted = false

		if (this.timeout) {
			clearTimeout(this.timeout)
		}
	}

	render() {
		return (
			<React.Fragment>
				<BoxBit flex />
				<BoxBit row style={ Styles.container }>
					<BoxBit flex style={ Styles.content }>
						<TextBit size="p1" style={ Styles.text }>{ this.props.message }</TextBit>
					</BoxBit>
					<BoxBit centering onPress={ this.props.onClose } style={ Styles.icon }>
						<IconBit name="close" color={ Colors.white } />
					</BoxBit>
				</BoxBit>
			</React.Fragment>
		)
	}
}

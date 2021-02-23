import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


class TabIcon extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Icon name={this.props.focused ? this.props.online : this.props.outline}
                  style={{color: this.props.focused ? '#36759e' : '#999'}} size={this.props.size}/>
        )
    }
}

export default TabIcon


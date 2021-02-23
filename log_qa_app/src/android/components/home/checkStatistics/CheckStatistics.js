import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import globalStyles from '../../../GlobalStyles'
import { Thumbnail } from 'native-base'
import * as checkStatisticsAction from './CheckStatisticsAction'


class CheckStatistics extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.props.getCheckStatistics())
    }

    render() {
        const { data: { check_count, d_count } } = this.props.checkStatisticsReducer
        const { data: { user: { real_name, avatar_image }, user } } = this.props.loginReducer
        const { communicationSettingReducer: { data: {  file_host } } } = this.props
        // console.log('avatar_image',avatar_image)
        // console.log('user',user)
        return (
            <View style={[globalStyles.styleBackgroundColor, styles.container]}>
                <View style={styles.item}>
                    <View style={styles.circle}>
                        <Text style={[globalStyles.smallText, styles.text]}>本月申报</Text>
                        <Text style={[globalStyles.xlText, styles.text]}>{d_count ? `${d_count}` : '0'}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Thumbnail source={{ uri: `${file_host}/image/${avatar_image}` }} style={styles.thumbnail} />
                    <Text style={[globalStyles.midText, styles.text]}>{real_name ? `${real_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.circle}>
                        <Text style={[globalStyles.smallText, styles.text]}>今日检车</Text>
                        <Text style={[globalStyles.xlText, styles.text]}>{check_count ? `${check_count}` : '0'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    item: {
        paddingBottom: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        borderWidth: 4,
        borderColor: '#91afc5'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#91afc5',
        backgroundColor: '#4e83a7',
        justifyContent: 'center',
        alignItems: 'center'
    }
})



const mapStateToProps = (state) => {
    return {
        checkStatisticsReducer: state.checkStatisticsReducer,
        loginReducer: state.loginReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCheckStatistics: () => {
        dispatch(checkStatisticsAction.getCheckStatistics())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckStatistics)

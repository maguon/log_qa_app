import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native'
import globalStyles from '../../../GlobalStyles'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import moment from 'moment'

const ListHeader = () => {
    return (
        <View style={styles.header}>
            <Icon name='ios-newspaper-outline' style={[styles.headerIcon, globalStyles.styleColor]} />
            <Text style={[globalStyles.midText, globalStyles.styleColor, styles.headerText, {}]}>操作记录</Text>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.item}>
            <Text style={globalStyles.smallText}>暂无记录</Text>
        </View>
    )
}

const renderItem = props => {

    const { item: { name, timez, content }, index } = props

    return (
        <View key={index} style={styles.item}>
            <Text style={globalStyles.midText}>{timez ? `${moment(timez).format('YYYY-MM-DD HH:mm:ss')}` : ''} {name ? `[${name}]` : ''} {content ? `${content}` : ''}</Text>
        </View>
    )
}

const RecordForDemageInfo = props => {
    const { recordForDemageReducer: { data: { carInfoRecord } } } = props
    return (
        <View style={{ flex: 1 }}>
            <ListHeader />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `${index}`}
                data={carInfoRecord}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmpty} />
        </View>

    )
}

const mapStateToProps = (state) => {
    return {
        recordForDemageReducer: state.recordForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RecordForDemageInfo)

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingVertical: 10,
        marginHorizontal: 15
    },
    headerText: {
        paddingLeft: 10
    },
    headerIcon: {
        fontSize: 20
    },
    item: {
        marginHorizontal: 15,
        paddingVertical: 5
    }
})


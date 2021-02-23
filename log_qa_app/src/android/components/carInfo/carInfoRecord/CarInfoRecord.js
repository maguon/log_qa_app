import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { ListItem } from 'native-base'
import globalStyles from '../../../GlobalStyles'
import * as carInfoRecordAction from './CarInfoRecordAction'
import moment from 'moment'

const renderListItem = props => {
    const { item: { name, timez, content }, index } = props
    return (
        <View key={index} style={styles.listItemContainer}>
            <Text style={globalStyles.midText}>{timez ? `${moment(timez).format('YYYY-MM-DD HH:mm:ss')}` : ''} {name ? `[${name}]` : ''} {content ? `${content}` : ''}</Text>
        </View>
    )
}

const renderListEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={globalStyles.midText}>暂无记录</Text>
        </View>
    )
}

const renderListHeader = () => {
    return (
        <ListItem>
            <Text style={[globalStyles.midText, globalStyles.styleColor]}>操作记录</Text>
        </ListItem>
    )
}

const renderListFooter = () => {
    return (
        <View style={styles.listFooterContainer} />
    )
}


const CarInfoRecord = props => {
    console.log('props',props)
    const { carInfoRecord } = props.carInfoRecordReducer.data
    // console.log('props.carInfoRecordReducer.data', props.carInfoRecordReducer.data)
    // console.log('carInfoRecord.comment', carInfoRecord.comment)
    return (
        <FlatList
            keyExtractor={(item, index) => `${index}`}
            showsVerticalScrollIndicator={false}
            data={carInfoRecord}
            renderItem={renderListItem}
            ListEmptyComponent={renderListEmpty}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={renderListFooter}
        />
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        marginHorizontal: 15,
        marginTop: 5
    },
    listEmptyContainer: {
        margin: 15
    },
    listFooterContainer: {
        height: 5
    }
})

const mapStateToProps = (state) => {
    return {
        carInfoRecordReducer: state.carInfoRecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfoRecord)

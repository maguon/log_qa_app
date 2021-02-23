import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { Thumbnail, Spinner ,Content} from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import * as routerDirection from '../../../util/RouterDirection'
import * as carDetailAction from '../../components/carInfo/carDetail/CarDetailAction'
import * as carInfoRecordAction from '../../components/carInfo/carInfoRecord/CarInfoRecordAction'
import * as searchCarAction from './SearchCarAction'

const renderItem = props => {
    const { item: { vin, id }, index, getCarInfoRecordWaiting, getCarDetailWaiting, getCarDetail, getCarInfoRecord, name } = props
    return (
        <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => {
                getCarInfoRecordWaiting()
                getCarDetailWaiting()
               
                routerDirection.carInfo(name)
                InteractionManager.runAfterInteractions(() => {
                    getCarDetail({ car_id: id })
                    getCarInfoRecord({ car_id: id, vin })
                })
            }}>
            <Text style={globalStyles.midText}>{vin ? `${vin}` : ''}</Text>
        </TouchableOpacity >
    )
}

const ListEmptyComponent = props => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>未搜到该VIN码车辆信息</Text>
        </View>
    )
}

const ListFooterComponent = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        paddingVertical: 10
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})

const SearchCar = props => {
    const { searchCarReducer: { data: { carList }, getCarList },
        searchCarReducer,
        searchCarValues,
        getCarDetail,
        getCarInfoRecord,
        getCarInfoRecordWaiting,
        getCarDetailWaiting,
        getCarListMore,
        name } = props
    // console.log('getCarList',getCarList)
    // console.log('searchCarValues',searchCarValues)
    return (
        <Content style={globalStyles.marginTop}>
        <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
                if (searchCarValues && searchCarValues.vinCode.length > 5 && getCarList.isResultStatus == 2) {
                    getCarListMore()
                }
            }}
            data={(searchCarValues && searchCarValues.vinCode.length > 5) ? carList : []}
            ListFooterComponent={searchCarReducer.getCarListMore.isResultStatus == 1 ? ListFooterComponent : undefined}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={({ item, index }) => renderItem({ name, item, index, getCarDetail, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting })} />
    </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        searchCarReducer: state.searchCarReducer,
        searchCarValues: getFormValues('SearchCar')(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarDetail: (param) => {
        dispatch(carDetailAction.getCarDetail(param))
    },
    getCarInfoRecord: (param) => {
        dispatch(carInfoRecordAction.getCarInfoRecord(param))
    },
    getCarInfoRecordWaiting: () => {
        dispatch(carInfoRecordAction.getCarInfoRecordWaiting())
    },
    getCarDetailWaiting: () => {
        dispatch(carDetailAction.getCarDetailWaiting())
    },
    getCarListMore: () => {
        dispatch(searchCarAction.getCarListMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCar)

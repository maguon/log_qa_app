import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity, RefreshControl, InteractionManager, ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import {Container, Icon, Thumbnail} from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as routerDirection from "../../../util/RouterDirection";
import moment from "../checkVehicleAllList/CheckVehicleAllList";
import * as TodayCheckAction from "../todayCheck/TodayCheckAction";
import * as carDetailAction from "../../components/carInfo/carDetail/CarDetailAction";
import * as carInfoRecordAction from "../../components/carInfo/carInfoRecord/CarInfoRecordAction";

const renderListItem = props => {
    const { item: { qa_count, id }, index} = props
    // console.log(props)
    return (
        <TouchableOpacity key={index} style={[styles.itemContainer]} >
            <View style={styles.itemHeaderContainer}>
                <Icon name="ios-time-outline" style={styles.itemHeaderIcon} />
                <Text style={[globalStyles.smallText, styles.text]}>{id ?id : ''}</Text>
            </View>
            <View style={styles.itemBodyContainer}>
                <View style={styles.itemBodyLeft}>
                    <Icon name="ios-car" style={[globalStyles.styleColor, styles.itemBodyIcon]} />
                    <Text style={[globalStyles.midText, styles.text]}>{qa_count ? `${qa_count}` : 0}辆</Text>
                </View>
                {/*<Text style={globalStyles.smallText}>{comment ? `${comment}` : ''}</Text>*/}
            </View>

        </TouchableOpacity>
    )
}


const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}
const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无今日检车记录</Text>
        </View>
    )
}

const TodayCheck = props => {
    const {todayCheckReducer: {data: {todayCheckList,isComplete}, getTodayCheckList, getTodayCheckMore},parent, getTodayCheckListWaiting, getTodayCheck, TodayCheckMore,
            getCarDetail, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting
        } = props
        console.log(todayCheckList)
        return (
            <Container>
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={getTodayCheckList.isResultStatus == 1}
                        onRefresh={() => {
                            getTodayCheckListWaiting()
                            InteractionManager.runAfterInteractions(getTodayCheck)
                        }}
                        colors={[styleColor]}
                    />}
                    keyExtractor={(item, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    // onEndReached={() => {
                    //     if (getTodayCheckList.isResultStatus == 2 && !isComplete) {
                    //         TodayCheckMore()
                    //     }
                    // }}
                    ListFooterComponent={getTodayCheckMore.isResultStatus == 1 ? ListFooterComponent : <View/>}
                    renderItem={({item, index}) => renderListItem({
                        item,
                        index,
                    })}
                    data={todayCheckList}
                />
            </Container>
        )


}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        borderBottomWidth: 0.3,
        borderColor: '#ddd',
        paddingVertical: 5
    },
    itemHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    itemBodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    itemHeaderIcon: {
        fontSize: 14,
        color: '#00cade'
    },
    itemBodyLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBodyIcon: {
        fontSize: 20
    },
    text: {
        paddingLeft: 5
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

const mapStateToProps = (state) => {
    return {
        todayCheckReducer: state.todayCheckReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTodayCheckListWaiting: () => {
        dispatch(TodayCheckAction.getTodayCheckListWaiting())
    },
    getTodayCheck: () => {
        dispatch(TodayCheckAction.getTodayCheck())
    },
    TodayCheckMore: () => {
        dispatch(TodayCheckAction.TodayCheckMore())
    },
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
})

export default connect(mapStateToProps, mapDispatchToProps)(TodayCheck)
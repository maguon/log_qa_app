import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, List, Left, ListItem, Thumbnail, Separator, Body, Right, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Actions } from 'react-native-router-flux'
import * as responsibilityListAction from './ResponsibilityListAction'
import * as carInfoForDemageAction from '../../components/demageInfo/carInfoForDemage/CarInfoForDemageAction'
import * as recordForDemageAction from '../../components/demageInfo/recordForDemage/RecordForDemageAction'
import * as demageOpResultAction from '../../components/demageInfo/demageOpResult/DemageOpResultAction'
import * as imageListForDemageAction from '../../components/demageInfo/imageListForDemage/ImageListForDemageAction'
import moment from 'moment'

const renderListItem = props => {
    const { item: { id, vin, damage_explain, make_name, created_on, car_id },
        index,
        item,
        getCarInfo,
        getCarInfoWaiting,
        getCarInfoRecordWaiting,
        getCarInfoRecord,
        getDemageOpResult,
        getDemageOpResultWaiting,
        getDamageImageListWaiting,
        getDamageImageList } = props
    return (
        <TouchableOpacity style={styles.listItemContainer} onPress={() => {
            getCarInfoWaiting()
            getCarInfoRecordWaiting()
            getDemageOpResultWaiting()
            getDamageImageListWaiting()
            Actions.responsibilityInfo({ initParam: item })
            InteractionManager.runAfterInteractions(() => {
                getCarInfo({ car_id })
                getCarInfoRecord({ car_id })
                getDemageOpResult({ id })
                getDamageImageList({ id })
            })
        }}>
            <View style={styles.listItemTopContainer}>
                <Text style={globalStyles.smallText}>编号：{id ? `${id}` : ''}</Text>
                <View style={styles.itemGroup}>
                    <Icon name='time-outline' style={styles.clockIcon} />
                    <Text style={[globalStyles.smallText, styles.text]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                </View>
            </View>
            <View style={styles.listItemBodyContainer}>
                <View style={styles.itemGroup}>
                    <Icon name='ios-car' style={styles.carIcon} />
                    <Text style={[globalStyles.midText, styles.text]}>{vin ? `${vin}` : ''}</Text>
                </View>
                <Text style={globalStyles.midText}>{make_name ? `${make_name}` : ''}</Text>
            </View>
            <View style={styles.listItemBottomContainer}>
                <Icon name='ios-alert' style={styles.alertIcon} />
                <Text style={[globalStyles.midText, styles.text]}>说明：<Text>{damage_explain ? `${damage_explain}` : ''}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无责任记录</Text>
        </View>
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

const ResponsibilityList = props => {
    const { responsibilityListReducer: { data: { responsibilityList, isComplete }, getResponsibilityList },
        responsibilityListReducer,
        getResponsibilityListMore,
        getCarInfo,
        getCarInfoWaiting,
        getCarInfoRecordWaiting,
        getCarInfoRecord,
        getDemageOpResult,
        getDemageOpResultWaiting,
        getDamageImageListWaiting,
        getDamageImageList } = props
    if (getResponsibilityList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container style={[globalStyles.listBackgroundColor,globalStyles.marginTop]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={renderEmpty}
                    data={responsibilityList}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getResponsibilityList.isResultStatus == 2 && !isComplete) {
                            getResponsibilityListMore()
                        }
                    }}
                    ListFooterComponent={responsibilityListReducer.getResponsibilityListMore.isResultStatus == 1 ? ListFooterComponent : <View style={{ height: 10 }} />}
                    renderItem={({ item, index }) => renderListItem({
                        item,
                        index,
                        getCarInfo,
                        getCarInfoWaiting,
                        getCarInfoRecordWaiting,
                        getCarInfoRecord,
                        getDemageOpResult,
                        getDemageOpResultWaiting,
                        getDamageImageListWaiting,
                        getDamageImageList
                    })} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    listItemContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 0.3,
        borderColor: '#777',
        backgroundColor: '#fff'
    },
    listItemTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 0.3,
        borderColor: '#777',
        alignItems: 'center'
    },
    listItemBodyContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    listItemBottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    text: {
        paddingLeft: 5
    },
    itemGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    clockIcon: {
        fontSize: 15,
        color: '#00cade'
    },
    carIcon: {
        fontSize: 20,
        color: '#ccc'
    },
    alertIcon: {
        fontSize: 20,
        color: '#fa7376'
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
        responsibilityListReducer: state.responsibilityListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getResponsibilityListMore: () => {
        dispatch(responsibilityListAction.getResponsibilityListMore())
    },
    getCarInfo: (param) => {
        dispatch(carInfoForDemageAction.getCarInfo(param))
    },
    getCarInfoWaiting: () => {
        dispatch(carInfoForDemageAction.getCarInfoWaiting())
    },
    getCarInfoRecord: (param) => {
        dispatch(recordForDemageAction.getCarInfoRecord(param))
    },
    getCarInfoRecordWaiting: () => {
        dispatch(recordForDemageAction.getCarInfoRecordWaiting())
    },
    getDemageOpResult: (param) => {
        dispatch(demageOpResultAction.getDemageOpResult(param))
    },
    getDemageOpResultWaiting: () => {
        dispatch(demageOpResultAction.getDemageOpResultWaiting())
    },
    getDamageImageListWaiting: (param) => {
        dispatch(imageListForDemageAction.getDamageImageListWaiting())
    },
    getDamageImageList: (param) => {
        dispatch(imageListForDemageAction.getDamageImageList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResponsibilityList)

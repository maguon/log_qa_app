import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager,
    RefreshControl,
    Modal,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {Icon, Thumbnail, Container, Button, List, Content, Left, Body, Right, ListItem} from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as routerDirection from '../../../util/RouterDirection'
import * as checkVehicleAllListActions from './checkVehicleAllListActions'
import * as carDetailAction from '../../components/carInfo/carDetail/CarDetailAction'
import * as carInfoRecordAction from '../../components/carInfo/carInfoRecord/CarInfoRecordAction'
import moment from 'moment'
import DatePicker from '../../components/share/form/DatePicker'
import {Actions} from "react-native-router-flux";
import * as TodayCheckAction from "../todayCheck/TodayCheckAction";



const { width } = Dimensions.get('window')


const renderListItem = props => {
    const { item: { vin, comment, created_on, id }, index, getCarDetail, parent, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting } = props
    return (
        <TouchableOpacity key={index} style={[styles.itemContainer]} onPress={() => {
            getCarInfoRecordWaiting()
            getCarDetailWaiting()
            routerDirection.carInfo(parent)()
            InteractionManager.runAfterInteractions(() => {
                getCarDetail({ car_id: id })
                getCarInfoRecord({ car_id: id ,vin})
            })
        }}>
            <View style={styles.itemHeaderContainer}>
                <Icon name="ios-time-outline" style={styles.itemHeaderIcon} />
                <Text style={[globalStyles.smallText, styles.text]}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm:ss')}` : ''}</Text>
            </View>
            <View style={styles.itemBodyContainer}>
                <View style={styles.itemBodyLeft}>
                    <Icon name="ios-car" style={[globalStyles.styleColor, styles.itemBodyIcon]} />
                    <Text style={[globalStyles.midText, styles.text]}>{vin ? `${vin}` : ''}</Text>
                </View>
                <Text style={globalStyles.smallText}>{comment ? `${comment}` : ''}</Text>
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无检车记录</Text>
        </View>
    )
}

class CheckVehicleAllList extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.cleanCheckVehicleAllList()
    }

    render() {
        const {checkStatisticsReducer:{ data: { check_count } }, checkVehicleAllListRudcer: { data: { checkVehicleAllList, isComplete, isModalVisible }, getCheckVehicleAllList }, checkVehicleAllListRudcer,
            getCheckVehicleAllListMore,
            getCarDetail, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting, parent, handleSubmit, getCheckVehicleListWaiting, getCheckVehicleList,getTodayCheckListWaiting,getTodayCheck
        } = this.props
        return (
            <Container style={[globalStyles.container,globalStyles.marginTop]}>
                <List style={styles.list}>
                    <ListItem icon onPress={() => {
                        getTodayCheckListWaiting()
                        Actions.todayCheck()
                       InteractionManager.runAfterInteractions(() => {
                           getTodayCheck()
                       })
                    }}>
                        <Left>
                            <Icon name="ios-search" style={globalStyles.styleColor} />
                        </Left>
                        <Body>
                            <Text style={globalStyles.midText}>今日检车:{check_count?check_count:0}辆</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
                <FlatList
                    refreshControl={<RefreshControl
                        refreshing={checkVehicleAllListRudcer.getCheckVehicleAllList.isResultStatus == 1}
                        onRefresh={() => {
                            getCheckVehicleListWaiting()
                            InteractionManager.runAfterInteractions(getCheckVehicleList)
                        }}
                        colors={[styleColor]}
                    />}
                    keyExtractor={(item, index) => `${index}`}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (getCheckVehicleAllList.isResultStatus == 2 && !isComplete) {
                            getCheckVehicleAllListMore()
                        }
                    }}
                    ListFooterComponent={checkVehicleAllListRudcer.getCheckVehicleAllListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                    data={checkVehicleAllList}
                    renderItem={({ item, index }) => renderListItem({ item, index, getCarDetail, parent, getCarInfoRecord, getCarDetailWaiting, getCarInfoRecordWaiting })}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible({ isModalVisible: false })
                    }}>
                    <Container style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.setModalVisible({ isModalVisible: false })} />
                        <View style={{ backgroundColor: '#fff', borderRadius: 5, width: width - 30,alignSelf:'center' }}>
                            <Field name='startDate' label='起始日期' component={DatePicker} bodyStyle={{ width: width - 30 }} itemStyle={{ width: width - 60 }} />
                            <Field name='endDate' label='终止日期' component={DatePicker} bodyStyle={{ width: width - 30 }} itemStyle={{ width: width - 60 }} />
                            <Button onPress={handleSubmit} style={[globalStyles.styleBackgroundColor, { margin: 15, alignSelf: 'center' }]}>
                                <Text style={[globalStyles.midText, { paddingHorizontal: 25, color: '#fff' }]}>查询</Text>
                            </Button>
                        </View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.setModalVisible({ isModalVisible: false })} />
                    </Container>
                </Modal>
            </Container>
        )
    }
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
    let { checkVehicleAllListRudcer: { data: { search } } } = state
    if (!search) {
        search = {}
    }
    return {
        checkStatisticsReducer:state.checkStatisticsReducer,
        checkVehicleAllListRudcer: state.checkVehicleAllListRudcer,
        initialValues: {
            startDate: search.startDate,
            endDate: state.endDate
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCheckVehicleAllListMore: () => {
        dispatch(checkVehicleAllListActions.getCheckVehicleAllListMore())
    },
    setModalVisible: param => {
        dispatch(checkVehicleAllListActions.setModalVisible(param))
    },
    getCheckVehicleList: () => {
        dispatch(checkVehicleAllListActions.getCheckVehicleAllList())
    },
    getCheckVehicleListWaiting: () => {
        dispatch(checkVehicleAllListActions.getCheckVehicleAllListWaiting())
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
    cleanCheckVehicleAllList: () => {
        dispatch(checkVehicleAllListActions.cleanCheckVehicleAllList())
    },
    getTodayCheck: () => {
        dispatch(TodayCheckAction.getTodayCheck())
    },
    getTodayCheckListWaiting: () => {
        dispatch(TodayCheckAction.getTodayCheckListWaiting())
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchCheckVehicleAllListForm',
    onSubmit: (values, dispatch) => {
        dispatch(checkVehicleAllListActions.setModalVisible({ isModalVisible: false }))
        dispatch(checkVehicleAllListActions.getCheckVehicleAllListWaiting())
        dispatch(checkVehicleAllListActions.getCheckVehicleAllList(values))

    }
})(CheckVehicleAllList))

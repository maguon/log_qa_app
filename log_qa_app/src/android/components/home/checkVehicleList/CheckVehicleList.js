import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    InteractionManager, RefreshControl, Alert
} from 'react-native'
import { connect } from 'react-redux'
import {Button, Icon, Thumbnail} from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import * as routerDirection from '../../../../util/RouterDirection'
import * as checkVehicleListAction from './CheckVehicleListAction'
import * as carDetailAction from '../../../components/carInfo/carDetail/CarDetailAction'
import * as carInfoRecordAction from '../../../components/carInfo/carInfoRecord/CarInfoRecordAction'
import moment from 'moment'


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

const renderEmpty = () => {

    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无检车记录</Text>

        </View>
    )
}

class CheckVehicleList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.props.getCheckVehicleList())
    }

    render() {
        const { checkVehicleListReducer: { data: { checkVehicleList } }, checkVehicleListReducer,
            getCarDetail, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting, parent, getCheckVehicleListWaiting, getCheckVehicleList
         } = this.props

        return (
            <FlatList
                refreshControl={<RefreshControl
                    refreshing={checkVehicleListReducer.getCheckVehicleList.isResultStatus == 1}
                    onRefresh={() => {
                        getCheckVehicleListWaiting()
                        InteractionManager.runAfterInteractions(getCheckVehicleList)
                    }}
                    colors={[styleColor]}
                />}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmpty}
                data={checkVehicleList}
                renderItem={({ item, index }) => renderListItem({ item, index, getCarDetail, parent, getCarInfoRecord, getCarDetailWaiting, getCarInfoRecordWaiting })}
            />
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
    }
})

const mapStateToProps = (state) => {
    return {
        checkVehicleListReducer: state.checkVehicleListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCheckVehicleList: () => {
        dispatch(checkVehicleListAction.getCheckVehicleList())
    },
    getCheckVehicleListWaiting: () => {
        dispatch(checkVehicleListAction.getCheckVehicleListWaiting())
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckVehicleList)

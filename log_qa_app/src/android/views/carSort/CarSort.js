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
import {Icon, Thumbnail, Container, Button, Tabs, Tab, Spinner} from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as routerDirection from '../../../util/RouterDirection'
import * as carSortActions from './carSortActions'
import * as carDetailAction from '../../components/carInfo/carDetail/CarDetailAction'
import * as carInfoRecordAction from '../../components/carInfo/carInfoRecord/CarInfoRecordAction'
import moment from 'moment'
import DatePicker from '../../components/share/form/DatePicker'


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
                getCarInfoRecord({ car_id: id, vin })
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
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无分拣记录</Text>
        </View>
    )
}
const renderEmptyIn = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无入库记录</Text>
        </View>
    )
}
const renderEmptyOut = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Thumbnail square source={{ uri: 'emptylisticon' }} />
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无出库记录</Text>
        </View>
    )
}

class CarSort extends Component {
    constructor(props) {
        super(props)
        this.state={index:0}
    }

    componentWillUnmount() {
        this.props.cleanCarSortList()
    }

    render() {
        const { carSortReducer: { data: { carSortList, isComplete, isModalVisible } }, carSortReducer,
            getCarSortListMore,
            getCarDetail, getCarInfoRecord, getCarInfoRecordWaiting, getCarDetailWaiting, parent,
            handleSubmit, getCarSortListWaiting, getCarSortList,cleanCarSortList
        } = this.props
        return (
            <Container style={[globalStyles.container,globalStyles.marginTop]}>


                <Tabs
                    onChangeTab={index=>{
                        this.setState({index:i})
                        console.log(index)
                        const {i,ref,from}=index
                        getCarSortList({index:i})
                    }}
                >
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="分拣道位"
                     >
                        <Container>
                            <FlatList
                                refreshControl={<RefreshControl
                                    refreshing={carSortReducer.getCarSortList.isResultStatus == 1}
                                    onRefresh={() => {
                                        getCarSortListWaiting()
                                        InteractionManager.runAfterInteractions(getCarSortList)
                                    }}
                                    colors={[styleColor]}
                                />}
                                keyExtractor={(item, index) => `${index}`}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={renderEmpty}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (carSortReducer.getCarSortList.isResultStatus == 2 && !isComplete) {
                                        getCarSortListMore()
                                    }
                                }}
                                ListFooterComponent={carSortReducer.getCarSortListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                                data={carSortList}
                                renderItem={({ item, index }) => renderListItem({ item, index, getCarDetail, parent, getCarInfoRecord, getCarDetailWaiting, getCarInfoRecordWaiting })}
                            />
                        </Container>
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="分拣入库"
                       >
                        <Container>
                            <FlatList
                                refreshControl={<RefreshControl
                                    refreshing={carSortReducer.getCarSortList.isResultStatus == 1}
                                    onRefresh={() => {
                                        getCarSortListWaiting()
                                        InteractionManager.runAfterInteractions(getCarSortList)
                                    }}
                                    colors={[styleColor]}
                                />}
                                keyExtractor={(item, index) => `${index}`}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={renderEmptyIn}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (carSortReducer.getCarSortList.isResultStatus == 2 && !isComplete) {
                                        getCarSortListMore()
                                    }
                                }}
                                ListFooterComponent={carSortReducer.getCarSortListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                                data={carSortList}
                                renderItem={({ item, index }) => renderListItem({ item, index, getCarDetail, parent, getCarInfoRecord, getCarDetailWaiting, getCarInfoRecordWaiting })}
                            />
                        </Container>
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="分拣出库"
                       >
                        <Container>
                            <FlatList
                                refreshControl={<RefreshControl
                                    refreshing={carSortReducer.getCarSortList.isResultStatus == 1}
                                    onRefresh={() => {
                                        getCarSortListWaiting()
                                        InteractionManager.runAfterInteractions(getCarSortList)
                                    }}
                                    colors={[styleColor]}
                                />}
                                keyExtractor={(item, index) => `${index}`}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={renderEmptyOut}
                                onEndReachedThreshold={0.2}
                                onEndReached={() => {
                                    if (carSortReducer.getCarSortList.isResultStatus == 2 && !isComplete) {
                                        getCarSortListMore()
                                    }
                                }}
                                ListFooterComponent={carSortReducer.getCarSortListMore.isResultStatus == 1 ? ListFooterComponent : <View />}
                                data={carSortList}
                                renderItem={({ item, index }) => renderListItem({ item, index, getCarDetail, parent, getCarInfoRecord, getCarDetailWaiting, getCarInfoRecordWaiting })}
                            />
                        </Container>
                    </Tab>

                </Tabs>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        this.props.setModalVisible({ isModalVisible: false })
                    }}>
                    <Container style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.setModalVisible({ isModalVisible: false })} />
                        <View style={{ backgroundColor: '#fff', borderRadius: 5, width: width - 30, alignSelf: 'center' }}>
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
    let { carSortReducer: { data: { search ,type} } } = state
    if (!search) {
        search = {}
    }
    return {
        carSortReducer: state.carSortReducer,
        initialValues: {
            startDate: search.startDate,
            endDate: state.endDate
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarSortListMore: () => {
        dispatch(carSortActions.getCarSortListMore())
    },
    setModalVisible: param => {
        dispatch(carSortActions.setModalVisible(param))
    },
    getCarSortList: (type) => {
        dispatch(carSortActions.getCarSortList(type))
    },
    getCarSortListWaiting: () => {
        dispatch(carSortActions.getCarSortListWaiting())
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
    cleanCarSortList: () => {
        dispatch(carSortActions.cleanCarSortList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'searchCarSortListForm',
    onSubmit: (values, dispatch) => {
        dispatch(carSortActions.setModalVisible({ isModalVisible: false }))
        dispatch(carSortActions.getCarSortListWaiting())
        dispatch(carSortActions.getCarSortList(values))
    }
})(CarSort))

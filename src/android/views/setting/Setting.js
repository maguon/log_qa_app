import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Container, Content, List, Left, ListItem, Thumbnail, Separator, Body, Right, Icon, Button } from 'native-base'
import { connect } from 'react-redux'
import FoundationIcon from 'react-native-vector-icons/dist/Foundation'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../GlobalStyles'
import * as demageListAction from '../demageList/DemageListAction'
import * as responsibilityListAction from '../responsibilityList/ResponsibilityListAction'
import * as checkVehicleAllListActions from '../checkVehicleAllList/checkVehicleAllListActions'
import * as carSortActions from '../carSort/carSortActions'
import * as loginAction from '../login/LoginAction'
import ConfirmModal from '../../components/share/ConfirmModal'


class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false
        }
        this.exitApp = this.exitApp.bind(this)
        this.onPressOk = this.onPressOk.bind(this)
        this.onPressCancel = this.onPressCancel.bind(this)
    }

    exitApp() {
        this.setState({ confirmModalVisible: true })
    }

    onPressOk() {
        this.setState({ confirmModalVisible: false })
        this.props.cleanLogin()
    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    render() {
        const { getDemageListWaiting,
            getDemageList,
            getResponsibilityListWaiting,
            getResponsibilityList,
            cleanLogin,
            getCarSortList,
            getCarSortListWaiting,
            getCheckVehicleAllList,
            getCheckVehicleAllListWaiting,
            loginReducer: { data: { user: { real_name, avatar_image, mobile } } },
            initializationReducer: { data: { version: { force_update, currentVersion, url } } }, initializationReducer } = this.props
        const { communicationSettingReducer: { data: {  file_host } } } = this.props
        return (
            <Container>
                <Content style={[globalStyles.container,globalStyles.marginTop]}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        <ListItem last onPress={Actions.personalCenter}>
                            <View style={styles.avatarContainer}>
                                <Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />
                                <View style={styles.userContainer}>
                                    <Text style={globalStyles.midText}>{real_name ? `${real_name}` : ''}</Text>
                                    <Text style={globalStyles.midText}>{mobile ? `${mobile}` : ''}</Text>
                                </View>
                            </View>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon onPress={() => {
                            getCheckVehicleAllListWaiting()
                            Actions.checkVehicleAllList()
                            InteractionManager.runAfterInteractions(() => {
                                getCheckVehicleAllList()
                            })
                        }}>
                            <Left>
                                <Icon name="md-magnet" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>检车记录</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => {
                            getCarSortListWaiting()
                            Actions.carSort()
                            InteractionManager.runAfterInteractions(() => {
                                getCarSortList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-funnel" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>分拣记录</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => {
                            getDemageListWaiting()
                            Actions.demageList()
                            InteractionManager.runAfterInteractions(() => {
                                getDemageList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-alert" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的质损</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last onPress={() => {
                            getResponsibilityListWaiting()
                            Actions.responsibilityList()
                            InteractionManager.runAfterInteractions(() => {
                                getResponsibilityList()
                            })
                        }}>
                            <Left>
                                <Icon name="ios-umbrella" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>我的责任</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon>
                            <Left>
                                <Icon name="ios-cube-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>版本信息：v{currentVersion}</Text>
                            </Body>
                            <Right >
                                {force_update != 0 && <TouchableOpacity onPress={() => {
                                    if (url) {
                                        Linking.canOpenURL(url)
                                            .then(supported => {
                                                if (!supported) {
                                                    console.log('Can\'t handle url: ' + url)
                                                } else {
                                                    return Linking.openURL(url)
                                                }
                                            })
                                            .catch(err => console.error('An error occurred', err))
                                    }
                                }}>
                                    <FoundationIcon name="burst-new" size={30} color={'#ff0000'} />
                                </TouchableOpacity>}
                            </Right>
                        </ListItem>
                        <ListItem icon last onPress={Actions.updatePassword}>
                            <Left>
                                <Icon name="ios-key-outline" style={globalStyles.styleColor} />
                            </Left>
                            <Body>
                                <Text style={globalStyles.midText}>修改密码</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]} onPress={this.exitApp}>
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
                <ConfirmModal
                    title='确认退出应用？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={this.onPressOk.bind(this)}
                    onPressCancel={this.onPressCancel.bind(this)}
                />
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        settingReducer: state.settingReducer,
        initializationReducer: state.initializationReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDemageList: () => {
        dispatch(demageListAction.getDemageList())
    },
    getDemageListWaiting: () => {
        dispatch(demageListAction.getDemageListWaiting())
    },
    getResponsibilityList: () => {
        dispatch(responsibilityListAction.getResponsibilityList())
    },
    getResponsibilityListWaiting: () => {
        dispatch(responsibilityListAction.getResponsibilityListWaiting())
    },
    getCheckVehicleAllList: req => {
        dispatch(checkVehicleAllListActions.getCheckVehicleAllList(req))
    },
    getCheckVehicleAllListWaiting: () => {
        dispatch(checkVehicleAllListActions.getCheckVehicleAllListWaiting())
    },
    getCarSortList: req => {
        dispatch(carSortActions.getCarSortList(req))
    },
    getCarSortListWaiting: () => {
        dispatch(carSortActions.getCarSortListWaiting())
    },
    cleanLogin: () => {
        dispatch(loginAction.cleanLogin())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting)




import React, { Component } from 'react'
import { Header,  Button, Icon,  Left, Body, Text } from 'native-base'
import { View, StatusBar, StyleSheet,  TouchableHighlight, Modal, InteractionManager, TouchableOpacity,Dimensions } from 'react-native'
import * as routerDirection from '../../../../util/RouterDirection'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import QRCodeScreen from '../../../views/QRCodeScreen'
import * as RouterDirection from '../../../../util/RouterDirection'
import * as searchCarAction from '../../../views/searchCar/SearchCarAction'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.barcodeReceived = this.barcodeReceived.bind(this)
    }


    barcodeReceived(e) {
        this.setState({ modalVisible: false })
        InteractionManager.runAfterInteractions(() => {
            RouterDirection.searchCar(this.props.initialRouteName)({ initParam: { vinCode: e.data } })
            InteractionManager.runAfterInteractions(() => {
                e.data.length > 5 && this.props.getCarList(e.data)
            })
        })
    }

    render() {
        const { initialRouteName } = this.props
        return (
            <View style={[styles.container, { width: width }]}>
                <StatusBar hidden={false} />
                <Header
                    androidStatusBarColor={styleColor}
                    style={globalStyles.styleBackgroundColor}>
                    <Left style={styles.left}>
                        <Button small transparent onPress={() => this.setState({ modalVisible: true })}>
                            <Icon name="scan" style={styles.leftIcon} />
                        </Button>
                    </Left>
                    <Body style={styles.body}>
                        <TouchableOpacity
                            underlayColor={'rgba(255, 255, 255, 0)'}
                            onPress={()=>{routerDirection.searchCar(initialRouteName)}}
                            style={styles.bodyTouch}>
                            <View style={styles.bodyTouchChild}>
                                <View style={styles.input} >
                                    <Text></Text>
                                </View>
                                <Icon name="ios-search" style={[globalStyles.textColor, styles.inputIcon]} />
                            </View>
                        </TouchableOpacity>
                    </Body>
                </Header>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <QRCodeScreen barcodeReceived={this.barcodeReceived} />
                </Modal>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 5
    },
    bodyTouch: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    bodyTouchChild: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 3
    },
    inputIcon: {
        paddingHorizontal: 5
    },
    input: {
        flex: 1
    },
    leftIcon: {
        color: '#fff'
    }

})


const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param) => {
        dispatch(searchCarAction.getCarList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

import React, { Component } from 'react'
import {
    Linking,
    ToastAndroid,
    Platform,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import * as initializationAction from './InitializationAction'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.height

class Initialization extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }

    componentDidMount() {
        this.props.getCommunicationSetting()
       
    }

    linkDownload(url) {
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
    }

    render() {
        const { data, initAPP, loadLocalStorage, validateToken, validateVersion } = this.props.initializationReducer
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={{ uri: 'init_back' }}
                    style={styles.image}
                />
                {(validateVersion.isResultStatus == 3 || validateToken.isResultStatus == 3) &&
                    <Button block onPress={() => { }} style={styles.button}>
                        <Text style={styles.buttonTiltle}>联系管理员</Text>
                    </Button>}
                {(validateVersion.isResultStatus == 5 || validateToken.isResultStatus == 5) &&
                    <Button block onPress={() => this.props.initApp()} style={styles.button}>
                        <Text style={styles.buttonTiltle}>重试</Text>
                    </Button>}
                {initAPP.isResultStatus == 2 && data.version.force_update == 1 &&
                    <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>立即更新</Text>
                    </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight
    },
    buttonTiltle: {
        fontSize: 18,
        color: '#0078a7'
    },
    button: {
        position: 'absolute',
        bottom: 50, width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 25
    }
})



const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    initApp: () => {
        dispatch(initializationAction.initApp())
    },
    getCommunicationSetting: () => {
        dispatch(initializationAction.getCommunicationSetting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Initialization)

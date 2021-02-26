import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    Animated,
    Easing,
    Vibration
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import Orientation from '@gergof/react-native-orientation'

export default class QRCodeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moveAnim: new Animated.Value(0)
        };
    }

    componentDidMount(){
        // console.log(" this.props", this.props)
        Orientation.lockToLandscape()
    }

    componentWillUnmount(){
        Orientation.lockToPortrait()
    }
      //  识别二维码
      onBarCodeRead = (result) => {  
        Vibration.vibrate()
        this.props.barcodeReceived(result)
   
    };
 
    render() {
        return (
            <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={this.onBarCodeRead.bind(this)}
            >
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                    <Text style={styles.rectangleText}>将条形码或二维码放入框内，即可自动扫描</Text>
                </View>
                </RNCamera>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});


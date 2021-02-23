import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    Vibration
} from 'react-native'
// import BarcodeScanner from 'react-native-barcodescanner'
// import BarcodeScanner from "@paraboly/react-native-barcode-scanner"
import { Actions } from 'react-native-router-flux'
import Orientation from '@gergof/react-native-orientation'

export default class QRCodeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: '',
            cameraType: 'back',
            text: 'Scan Barcode',
            torchMode: 'off',
            type: '',
        };
    }

    componentDidMount(){
        Orientation.lockToLandscape()
    }

    componentWillUnmount(){
        Orientation.lockToPortrait()
    }

    // barcodeReceived(e) {
    //     Vibration.vibrate()
    //     this.props.barcodeReceived(e)
    //     this.setState({
    //         barcode: e.data,
    //         text: `${e.data} (${e.type})`,
    //         type: e.type,
    //     });
    // }

    render() {
        return (
            <View style={styles.container}>
                {/* <BarcodeScanner
                    viewFinderHeight={80}
                    viewFinderWidth={450}
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}

                />  */}
              
              <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.text}</Text>
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    },
});
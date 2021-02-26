import React from 'react'
import CheckStatistics from '../components/home/checkStatistics/CheckStatistics'
import CheckVehicleList from '../components/home/checkVehicleList/CheckVehicleList'
import { Container } from 'native-base'
import globalStyles from '../GlobalStyles'
// import BarcodeScanner from '@paraboly/react-native-barcode-scanner'

const Home = props => {
    return (
        <Container style={[globalStyles.listBackgroundColor,globalStyles.marginTop]}>
            <CheckStatistics />
            <CheckVehicleList parent={props.parent} />
            {/* <BarcodeScanner
                onBarCodeRead={()=>{}}
                style={{ flex: 1 }}
                torchMode={'back'}
                cameraType={'off'}
            /> */}
        </Container>
    )
}

export default Home

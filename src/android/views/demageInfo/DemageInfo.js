import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { fontSizeCoeff } from '../../../util/util'
import { connect } from 'react-redux'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ListItem, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import CarInfoForDemage from '../../components/demageInfo/carInfoForDemage/CarInfoForDemage'
import RecordForDemage from '../../components/demageInfo/recordForDemage/RecordForDemage'
import ImageListForDemage from '../../components/demageInfo/ImageListForDemage'
import DemageOpResult from '../../components/demageInfo/demageOpResult/DemageOpResult'
import DemageDetail from '../../components/demageInfo/DemageDetail'
import DemageEditor from '../../components/demageInfo/demageEditor/DemageEditor'

const DemageInfo = props => {
    const { initParam: { damage_status },
        initParam,
        carInfoForDemageReducer: { getCarInfo },
        recordForDemageReducer: { getCarInfoRecord },
        parent } = props
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={{ backgroundColor: '#36759e' }}
                    activeTabStyle={{ backgroundColor: '#36759e' }}
                    activeTextStyle={{ color: '#fff' }}
                    textStyle={{ color: '#adc5d5' }}
                    heading="车辆">
                    {(getCarInfo.isResultStatus == 1 || getCarInfoRecord.isResultStatus == 1) ?
                        <Container>
                            <Spinner color={styleColor} />
                        </Container>
                        : <Container>
                            <CarInfoForDemage />
                            <RecordForDemage />
                        </Container>}
                </Tab>
                <Tab
                    tabStyle={{ backgroundColor: '#36759e' }}
                    activeTabStyle={{ backgroundColor: '#36759e' }}
                    activeTextStyle={{ color: '#fff' }}
                    textStyle={{ color: '#adc5d5' }}
                    heading="质损">
                    <Container>
                        {damage_status == 1 && <DemageEditor initParam={initParam} parent={parent}/>}
                        {damage_status != 1 && <DemageDetail />}
                    </Container>
                </Tab>
                <Tab
                    tabStyle={{ backgroundColor: '#36759e' }}
                    activeTabStyle={{ backgroundColor: '#36759e' }}
                    activeTextStyle={{ color: '#fff' }}
                    textStyle={{ color: '#adc5d5' }}
                    heading="照片">
                    <Container>
                        <ImageListForDemage />
                    </Container>
                </Tab>
                {damage_status != 1 && <Tab
                    tabStyle={{ backgroundColor: '#36759e', }}
                    activeTabStyle={{ backgroundColor: '#36759e' }}
                    activeTextStyle={{ color: '#fff' }}
                    textStyle={{ color: '#adc5d5' }}
                    heading="处理">
                    <Container>
                        <DemageOpResult />
                    </Container>
                </Tab>}
            </Tabs>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        demageInfoReducer: state.demageInfoReducer,
        carInfoForDemageReducer: state.carInfoForDemageReducer,
        recordForDemageReducer: state.recordForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DemageInfo)

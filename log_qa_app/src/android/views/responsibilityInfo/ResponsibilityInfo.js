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
import ImageListForDemage from '../../components/demageInfo/imageListForDemage/ImageListForDemage'
import DemageOpResult from '../../components/demageInfo/demageOpResult/DemageOpResult'
import DemageDetail from '../../components/demageInfo/DemageDetail'

const DemageInfo = props => {
    const { initParam: { damage_status },
        initParam,
        carInfoForDemageReducer: { getCarInfo },
        recordForDemageReducer: { getCarInfoRecord },
        demageOpResultReducer: { getDemageOpResult },
        parent } = props
    return (
        <Container style={[globalStyles.listBackgroundColor,globalStyles.marginTop]}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
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
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="质损">
                    <Container>
                        <DemageDetail initParam={initParam} />
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="照片">
                    <Container>
                        <ImageListForDemage initParam={initParam} parent={parent} />
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    // activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    // textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="处理">
                    {(getDemageOpResult.isResultStatus == 1) ?
                        <Container>
                            <Spinner color={styleColor} />
                        </Container>
                        : <Container>
                            <DemageOpResult damageStatus={damage_status} />
                        </Container>}
                </Tab>
            </Tabs>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        carInfoForDemageReducer: state.carInfoForDemageReducer,
        recordForDemageReducer: state.recordForDemageReducer,
        demageOpResultReducer: state.demageOpResultReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DemageInfo)

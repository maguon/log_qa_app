import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../../GlobalStyles'
import { connect } from 'react-redux'


const CarInfoForDemageInfo = props => {
    const { carInfoForDemageReducer: { data: { carInfo: { vin, addr_name, en_short_name, make_name, route_end, route_start, re_short_name } } } } = props
    // console.log('props',props)
    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer]}>
                <Icon name='ios-car' style={[styles.headerIcon, globalStyles.styleColor]} />
                <Text style={[globalStyles.largeText, globalStyles.styleColor, styles.headerText]}>{vin ? `${vin}` : ''}</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>品牌：</Text>{make_name ? `${make_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>委托方：</Text>{en_short_name ? `${en_short_name}` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>出发地：</Text>{route_start ? `${route_start}` : ''}{addr_name ? `(${addr_name})` : ''}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={globalStyles.midText}><Text style={styles.ItemTilte}>目的地：</Text>{route_end ? `${route_end}` : ''}{re_short_name ? `(${re_short_name})` : ''}</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        carInfoForDemageReducer: state.carInfoForDemageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfoForDemageInfo)

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: '#777',
        paddingVertical: 10
    },
    itemContainer: {
        paddingVertical: 5
    },
    item: {
        paddingVertical: 5,
        flexDirection: 'row'
    },
    headerIcon: {
        fontSize: 25
    },
    headerText: {
        paddingLeft: 10
    },
    ItemTilte: {
        fontWeight: 'bold'
    },
    container: {
        margin: 15
    }
})


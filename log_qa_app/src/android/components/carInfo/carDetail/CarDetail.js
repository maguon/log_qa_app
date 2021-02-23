import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Content, List, ListItem ,Left,Right,} from 'native-base'
import globalStyles from '../../../GlobalStyles'
import * as carDetailAction from './CarDetailAction'


const CarDetail = props => {
    const { carDetail: { make_name, en_short_name, route_start, route_end, vin, addr_name,qa_level, re_short_name,ship_name } } = props.carDetailReducer.data
    console.log('props.carDetailReducer.data', props.carDetailReducer.data)
    return (
        <View>
            <ListItem>
            <Left> 
                <Text style={[globalStyles.xlText, globalStyles.styleColor]}><Text style={styles.label}>vin：</Text>{vin ? `${vin}` : ''}</Text>
                </Left>   
                {qa_level==1&&<Right>
                <Image source={{ uri: 'chenk'  }}
                    style={{width:30,height:30}}
                />
                </Right>}
            </ListItem>
            <ListItem>
                <Text style={globalStyles.midText}><Text style={styles.label}>品牌：</Text>{make_name ? `${make_name}` : ''}</Text>
            </ListItem>
            <ListItem>
                <Text style={globalStyles.midText}><Text style={styles.label}>委托方：</Text>{en_short_name ? `${en_short_name}` : ''}</Text>
            </ListItem>
            <ListItem>
                <Text style={globalStyles.midText}><Text style={styles.label}>出发地：</Text>{route_start ? `${route_start}` : ''}{addr_name ? `(${addr_name})` : ''}</Text>
            </ListItem>
            <ListItem>
                <Text style={globalStyles.midText}><Text style={styles.label}>目的地：</Text>{route_end ? `${route_end}` : ''}{re_short_name ? `(${re_short_name})` : ''}</Text>
            </ListItem>
            <ListItem>
                <Text style={globalStyles.midText}><Text style={styles.label}>船名：</Text>{ship_name ? `${ship_name}` : ''}</Text>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    }
})

const mapStateToProps = (state) => {
    return {
        carDetailReducer: state.carDetailReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail)

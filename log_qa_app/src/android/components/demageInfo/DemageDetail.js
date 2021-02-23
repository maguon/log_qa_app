import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import globalStyles from '../../GlobalStyles'
import { Icon } from 'native-base'
import moment from 'moment'

const DemageDetail = props => {
    const { initParam: { id, damage_status, created_on, damage_explain, drive_name, truck_num } } = props
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor, {}]}>质损编号:{id ? `${id}` : ''}</Text>
                    <Text style={globalStyles.smallText}>{created_on ? `${moment(created_on).format('YYYY-MM-DD HH:mm')}` : ''}</Text>
                </View>
                <View style={styles.headerStatusItem}>
                    <Text style={[globalStyles.midText]}>
                        {damage_status == 1 && '未处理'}
                        {damage_status == 2 && '处理中'}
                        {damage_status == 3 && '已处理'}
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyItem}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>质损描述</Text>
                </View>
                <View style={styles.bodyItem}>
                    <Text style={globalStyles.midText}>{damage_explain ? `${damage_explain}` : ''}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={globalStyles.midText}><Text style={globalStyles.styleColor}>货车司机：</Text>{drive_name ? `${drive_name}` : ''}{truck_num ? `(${truck_num})` : ''}</Text>
            </View>
        </View>
    )
}

export default DemageDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        paddingVertical: 5,
        borderBottomWidth: 0.3,
        borderColor: '#777'
    },
    headerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'flex-end'
    },
    headerStatusItem: {
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    body: {
        paddingVertical: 15,
        borderBottomWidth: 0.3,
        borderColor: '#777',
    },
    bodyItem: {
        paddingVertical: 5
    },
    footer: {
        marginVertical: 15
    }
})


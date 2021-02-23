import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { Content } from 'native-base'
import { connect } from 'react-redux'
import globalStyles from '../../../GlobalStyles'
import { moneyFormat } from '../../../../util/util'
import damageTypeList from '../../../../util/damage_type.json'
import damageLinkTypeList from '../../../../util/damage_link_type.json'

const DemageOpResult = props => {
    const { demageOpResultReducer: { data: { demageOpResult: {
        op_user_name, company_cost, under_cost, profit, penalty_cost, reduction_cost, transport_cost, repair_cost, refund_user_name, under_user_name, damage_type, damage_link_type } } },
        damageStatus } = props
    // console.log('props', props)

    // console.log('damageLinkTypeList', damageLinkTypeList)

    // console.log('damage_link_type', damage_link_type)
    return (
        <Content showsVerticalScrollIndicator={false} style={{ backgroundColor: '#eaeef1' }}>
            {damageStatus == 3 && <View style={styles.body}>
                {/* <View style={styles.group}>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>基本信息</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>质损类型：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{damage_type ? `${damageTypeList.find(item => item.id == damage_type).value}` : ''}</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>责任人：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{under_user_name ? `${under_user_name}` : ''}</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>报销人：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{refund_user_name ? `${refund_user_name}` : ''}</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>质损环节：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{damage_link_type ? `${damageLinkTypeList.find(item => item.id == damage_link_type).value}` : ''}</Text>
                    </View>
                </View>
                <View style={styles.group}> 
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>费用信息</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>维修费：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{repair_cost ? `${moneyFormat(repair_cost, 2)}` : '0.00'}元</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>运费：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{transport_cost ? `${moneyFormat(transport_cost, 2)}` : '0.00'}元</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>降价费：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{reduction_cost ? `${moneyFormat(reduction_cost, 2)}` : '0.00'}元</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>罚款：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{penalty_cost ? `${moneyFormat(penalty_cost, 2)}` : '0.00'}元</Text>
                    </View>
                    <View style={styles.strikingItem}>
                        <Text style={[styles.text, globalStyles.midText, styles.title]}>盈亏：</Text>
                        <Text style={[styles.text, globalStyles.midText]}>{profit ? `${moneyFormat(profit, 2)}` : '0.00'}元</Text>
                    </View>
                </View>*/}
                <View style={styles.group}>
                    <Text style={[styles.text, globalStyles.midText, styles.title]}>责任信息</Text>
                    <View style={[styles.text, styles.strikingItem]}>
                        <Text style={[styles.title, globalStyles.midText]}>责任人承担费用：</Text>
                        <Text style={globalStyles.largeText}><Text style={styles.strikingText}>{under_cost ? `${moneyFormat(under_cost, 2)}` : '0.00'}</Text> 元</Text>
                    </View>
                    {/* <View style={[styles.text, styles.strikingItem]}>
                        <Text style={[styles.title, globalStyles.midText]}>公司承担费用：</Text>
                        <Text style={globalStyles.largeText}><Text style={styles.strikingText}>{company_cost ? `${moneyFormat(company_cost, 2)}` : '0.00'}</Text> 元</Text>
                    </View> */}
                </View>
            </View>}
            <View style={styles.footer}>
                <Text style={globalStyles.midText}><Text style={styles.title}>处理人：</Text>{op_user_name ? `${op_user_name}` : ''}</Text>
            </View>
        </Content>
    )
}

const mapStateToProps = (state) => {
    return {
        demageOpResultReducer: state.demageOpResultReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DemageOpResult)

const styles = StyleSheet.create({
    text: {
        padding: 5
    },
    title: {
        fontWeight: 'bold'
    },
    strikingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    strikingText: {
        color: 'red'
    },
    body: {
        margin: 7
    },
    footer: {
        paddingVertical: 15,
        marginHorizontal: 15,
        alignItems: 'flex-end'
    },
    group: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 7,
        borderColor: '#eee',
        borderWidth: 0.3
    }
})



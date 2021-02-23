import React, { Component } from 'react'
import { Text, View, TextInput, ToastAndroid, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Button, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as sendSMSAction from './SendSMSAction'

const TextBox = props => {
    const { input: { onChange, ...restProps } } = props
    return (
        <TextInput
            style={[globalStyles.midText, styles.itemInput]}
            onChangeText={onChange}
            {...restProps}
            placeholder='请输入手机号'
            underlineColorAndroid='transparent'
            placeholderTextColor='#ccc' />
    )
}
const SendSMS = props => {
    const { sendSMSReducer: { data: { countDownTime } }, getVCode, countDown } = props
    return (
        <View style={styles.item}>
            <Icon name='ios-phone-portrait' style={[styles.itemIcon, globalStyles.styleColor]} />
            <Text style={[globalStyles.midText, styles.itemText]}>手机号：</Text>
            <Field name='mobile' component={TextBox} />
            <Button
                small
                disabled={countDownTime < 60}
                style={[styles.itemButton, countDownTime == 60 && globalStyles.styleBackgroundColor]}
                onPress={() => {
                    getVCode()
                    countDown()
                }}>
                <Text style={[globalStyles.midText, styles.itemButtonTitle]}>发送验证码 {countDownTime < 60 && `(${countDownTime})`}</Text>
            </Button>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        sendSMSReducer: state.sendSMSReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getVCode: () => {
        dispatch(sendSMSAction.getVCode())
    },
    countDown: () => {
        dispatch(sendSMSAction.countDown())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'sendSMSForm'
    })(SendSMS))


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    itemIcon: {
        fontSize: 14
    },
    itemText: {
        marginLeft: 5
    },
    itemInput: {
        flex: 1,
        marginLeft: 5
    },
    itemButton: {
        alignSelf: 'center',
        marginLeft: 5,
        paddingHorizontal: 10
    },
    itemButtonTitle: {
        color: '#fff'
    }
})

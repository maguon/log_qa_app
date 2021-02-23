import React, { Component } from 'react'
import { Text, View, TextInput, ToastAndroid, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Button, Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import SendSMS from '../../components/retrievePassword/sendSMS/SendSMS'
import * as retrievePasswordAction from './RetrievePasswordAction'

const TextBox = props => {
    const { input: { onChange, ...restProps },
        title = '',
        icon = '',
        isRequired = false,
        meta: { error, touched } } = props
    return (
        <View style={styles.itemContainer}>
            <View style={styles.item}>
                <Icon name={icon} style={[styles.itemIcon, globalStyles.styleColor]} />
                <Text style={[globalStyles.midText, styles.itemText]}>{title}</Text>
                <TextInput
                    style={[globalStyles.midText, styles.itemInput]}
                    onChangeText={onChange}
                    {...restProps }
                    placeholder='请输入验证码'
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#ccc' />
            </View >
            {touched && (error && <View>
                <Text style={[globalStyles.smallText,styles.warnText]}>{error}</Text>
            </View>)}
        </View>

    )
}


const RetrievePassword = props => {
    const { handleSubmit } = props
    return (
        <Container style={styles.container}>
            <View>
                <SendSMS />
                <Field name='vCode' component={TextBox} title='验证码：' icon='ios-key' />
                <Field name='firstPassword' component={TextBox} title='新密码：' icon='ios-lock' />
                <Field name='secondPassword' component={TextBox} title='确认密码：' icon='ios-lock' />
            </View>
            <View>
                <Button
                    full
                    style={globalStyles.styleBackgroundColor}
                    onPress={handleSubmit}>
                    <Text style={{ color: '#fff' }}>确认</Text>
                </Button>

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: 'space-between'
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',

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
    warnText: {
        marginBottom: 10,
        color: 'red'
    }
})

const mapStateToProps = (state) => {
    return {
        retrievePasswordReducer: state.retrievePasswordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: () => {
        dispatch(retrievePasswordAction.retrieve())
    }
})

const validate = values => {
    const errors = { vCode: null, firstPassword: null, secondPassword: null }
    if (!values.vCode) {
        errors.vCode = '必填'
    }

    if (!values.firstPassword) {
        errors.firstPassword = '必填'
    }

    if (!values.secondPassword) {
        errors.secondPassword = '必填'
    }
    return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'retrievePasswordForm',
        validate
    })(RetrievePassword))

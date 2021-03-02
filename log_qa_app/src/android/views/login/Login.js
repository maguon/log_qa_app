import React from 'react'
import { View, Image, Linking, Dimensions, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon,  Item, Text, Input,  Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from '../../GlobalStyles'
import { Field, reduxForm } from 'redux-form'
import * as loginAction from './LoginAction'
import * as android_app from '../../../android_app.json'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16

const TextBox = props => {
    const { iconName, placeholderText, input: { onChange, ...restProps }, secureTextEntry = false } = props
    return (
        <Item rounded style={styles.item}>
            <Icon active name={iconName} style={styles.itemIcon} />
            <Input placeholder={placeholderText}
                placeholderTextColor='#9ECEF1'
                selectionColor='#9ECEF1'
                style={[globalStyles.largeText, styles.input]}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                {...restProps} />
        </Item>
    )
}

const Login = props => {
    const { login, initializationReducer: {  data: { version: { force_update, url } } } } = props
    // console.log('force_update', force_update)
    // console.log('props', props)
    return (
        <Container style={styles.container}>
            <StatusBar hidden={true} />
            <Image
                source={{ uri: 'login_back' }}
                style={styles.backgroundImage} />
            <Text style={[globalStyles.smallText, { color: 'rgba(255,255,255,0.1)', position: 'absolute', bottom: 5, right: 5 }]}>{android_app.version}</Text>
            <View style={styles.connectContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'logo' }}
                        style={styles.logo} />
                </View>
                <View>
                    <Image
                        source={{ uri: 'app_name' }}
                        style={styles.appname} />
                </View>
                {force_update != 1 && <View style={styles.formContainer}>
                    <Field
                        name='server'
                        iconName='md-globe'
                        placeholderText='请输入服务器域名'
                        component={TextBox} />
                    <Field
                        name='mobile'
                        iconName='md-person'
                        placeholderText='请输入用户名'
                        component={TextBox} />
                    <Field
                        name='password'
                        secureTextEntry={true}
                        iconName='md-lock-closed'
                        placeholderText='请输入密码'
                        component={TextBox} />
                    <Button style={[styles.itemButton, globalStyles.styleBackgroundColor]}
                        onPress={login}>
                        <Text style={[globalStyles.midText, styles.buttonTittle]}>登录</Text>
                    </Button>

                </View>}
                {force_update == 1 && <View style={styles.formContainer}>
                    <Button style={[globalStyles.styleBackgroundColor, { marginTop: 50 }]} onPress={() => {
                        if (url) {
                            Linking.canOpenURL(url)
                                .then(supported => {
                                    if (!supported) {
                                        console.log('Can\'t handle url: ' + url)
                                    } else {
                                        return Linking.openURL(url)
                                    }
                                })
                                .catch(err => console.error('An error occurred', err))
                        }
                    }}>
                        <Text style={[globalStyles.midText, styles.buttonTittle]}>请下载最新版本</Text>
                    </Button>
                </View>}
                {force_update != 1 && <TouchableOpacity style={styles.linkButton} onPress={() => Actions.retrievePassword()}>
                    <Text style={[globalStyles.midText, styles.linkButtonTittle]}>忘记密码？</Text>
                </TouchableOpacity>}

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: window.width,
        height: window.height
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: window.width / 4 * 3,
        borderWidth: 0,
        marginTop: 20
    },
    itemIcon: {
        color: '#9ECEF1',
        marginLeft: 10
    },
    itemButton: {
        marginTop: 50,
        width: window.width / 4 * 3,
        borderRadius: 25,
        justifyContent: 'center'
    },
    input: {
        color: '#9ECEF1'
    },
    buttonTittle: {
        color: '#fff'
    },
    linkButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingRight: 10
    },
    linkButtonTittle: {
        color: '#9ECEF1'
    },
    connectContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 20,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    appname: {
        width: 125,
        height: 38,
        marginTop: 20
    },
    formContainer: {
        marginTop: 30
    }
})


const mapStateToProps = (state) => {
    return {
        initialValues: {
            mobile: state.loginReducer.data.user.mobile,
            server: state.communicationSettingReducer.data.host
        },
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: () => {
        dispatch(loginAction.validateVersion())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'loginForm',
        enableReinitialize: true
    })(Login))

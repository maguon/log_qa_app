import * as httpRequest from '../../../util/HttpRequest'
import * as loginActionTypes from './LoginActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { ToastAndroid } from 'react-native'
import requestHeaders from '../../../util/RequestHeaders'
import localStorageKey from '../../../util/LocalStorageKey'
import {setItemObject} from '../../../util/LocalStorage'
import * as communicationSettingActions from '../communicationSetting/communicationSettingActions'
import * as initializationActionTypes from '../initialization/InitializationActionTypes'
// import { sleep } from '../../../util/util'
import * as android_app from '../../../android_app.json'


//登录
export const login = () => async (dispatch, getState) => {
    dispatch({ type: loginActionTypes.login_waiting, payload: {} })
    let { mobile, password, server } = getFormValues('loginForm')(getState())
    server = `${server}`.replace(/\s*/g, "")
    mobile = `${mobile}`.replace(/\s*/g, "")

    // console.log('server', server)
    // console.log('mobile', mobile)

    const base_host = `http://api.${server}/api`
    try {
        const url = `${base_host}/userLogin`
        // console.log('url', url)
        const res = await httpRequest.post(url, {
            mobile: mobile,
            password
        })
        // console.log('res', res)
        if (res.success) {
            if (res.result.type == 41 || res.result.type == 49) {
                const getUserInfoUrl = `${base_host}/user${ObjectToUrl({ userId: res.result.userId })}`
                const getUserInfoRes = await httpRequest.get(getUserInfoUrl)
                if (getUserInfoRes.success) {
                    // console.log('getUserInfoRes', getUserInfoRes)
                    const { uid, mobile, real_name, type, gender, avatar_image, status } = getUserInfoRes.result[0]
                    const user = {
                        uid, mobile, real_name, type, gender, avatar_image, status,
                        token: res.result.accessToken,
                    }
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', type)
                    requestHeaders.set('user-name', mobile)
                    await setItemObject(localStorageKey.USER,user)
                    await dispatch(communicationSettingActions.saveCommunicationSetting({ url: server }))
                    await dispatch({ type: loginActionTypes.login_success, payload: { user } })
                    Actions.main()
                } else {
                    ToastAndroid.show(`登陆失败：无法获取用户信息！`, 10)
                    dispatch({ type: loginActionTypes.login_failed, payload: { failedMsg: '无法获取用户信息！' } })
                }
            }
            else {
                ToastAndroid.show(`登陆失败：身份错误！`, 10)
                dispatch({ type: loginActionTypes.login_failed, payload: { failedMsg: '身份错误！' } })
            }
        } else {
            //登录失败重新登录
            ToastAndroid.show(`登陆失败：${res.msg}`, 10)
            dispatch({ type: loginActionTypes.login_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
            dispatch({ type: loginActionTypes.login_error, payload: { errorMsg: err } })
        } else {
            ToastAndroid.show(`登陆失败：${err}`, 10)
            dispatch({ type: loginActionTypes.login_error, payload: { errorMsg: err } })
        }
    }

}



//第一步：获取最新version信息
export const validateVersion = () => async (dispatch, getState) => {
    const currentStep = 1
    try {
        // console.log(getState())
        let { mobile, password, server } = getFormValues('loginForm')(getState())
        server = `${server}`.replace(/\s*/g, "")
        mobile = `${mobile}`.replace(/\s*/g, "")

        // console.log('server', server)
        // console.log('mobile', mobile)

        const base_host = `http://api.${server}/api`
        // const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/app${ObjectToUrl({ app: android_app.type, type: android_app.android })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        if (res.success) {
            const data = {
                currentVersion: android_app.version,
                newestVersion: '',
                url: '',
                remark: '',
                force_update: 0
            }
            const currentVersionArr = android_app.version.split('.')
            let versionList = res.result
                .filter(item => {
                    const itemArr = item.version.split('.')
                    if (currentVersionArr[0] < itemArr[0]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] < itemArr[1]) {
                        return true
                    } else if (currentVersionArr[0] == itemArr[0] && currentVersionArr[1] == itemArr[1] && currentVersionArr[2] < itemArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })

            if (versionList.length > 0) {
                if (versionList.some(item => item.force_update == 1)) {
                    data.force_update = 1
                } else {
                    data.force_update = 2
                }
                versionList = versionList.sort((a, b) => {
                    const aArr = a.version.split('.')
                    const bArr = b.version.split('.')
                    if (aArr[0] < bArr[0]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] < bArr[1]) {
                        return true
                    } else if (aArr[0] == bArr[0] && aArr[1] == bArr[1] && aArr[2] < bArr[2]) {
                        return true
                    } else {
                        return false
                    }
                })
                data.newestVersion = versionList[0].version
                data.url = versionList[0].url
                data.remark = versionList[0].remark

            } else {
                data.force_update = 0
                data.newestVersion = data.currentVersion
            }
            dispatch({ type: initializationActionTypes.Valdate_Version_Success, payload: { data, step: currentStep } })
            if (data.force_update != 1) {
                dispatch(login())
            } 
        } else {
            dispatch({ type: initializationActionTypes.Valdate_Version_Failed, payload: { failedMsg: res.msg, step: currentStep } })
        }
    } catch (err) {
        if (err.message == 'Network request failed') {
            //尝试20次
            // if (tryCount < 20) {
            //     await sleep(1000)
            //     dispatch(initApp(currentStep, tryCount + 1))
            // } else {
            ToastAndroid.show(`登陆失败：网络链接失败！`, 10)
            dispatch({ type: initializationActionTypes.Valdate_Version_NetWorkError, payload: { step: currentStep } })
            // }
        } else {
            dispatch({ type: initializationActionTypes.Valdate_Version_Error, payload: { errorMsg: err.message, step: currentStep } })
        }
    }
}

export const cleanLogin = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { mobile } } } } = getState()
    await  setItemObject( localStorageKey.USER,mobile)
    dispatch({ type: loginActionTypes.Set_UserInfo, payload: { user: { mobile } } })
    Actions.initialization()
}



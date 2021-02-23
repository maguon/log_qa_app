import * as httpRequest from '../../../util/HttpRequest'
import * as retrievePasswordActionTypes from './RetrievePasswordActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import {Actions } from 'react-native-router-flux'

export const retrieve = () => async (dispatch, getState) => {
    dispatch({ type: retrievePasswordActionTypes.Retrieve_WAITING, payload: {} })
    const state = getState()
    const sendSMSFormValues = getFormValues('sendSMSForm')(state)
    const retrievePasswordFormValues = getFormValues('retrievePasswordForm')(state)
    if (!sendSMSFormValues || !sendSMSFormValues.mobile) {
        ToastAndroid.showWithGravity(`电话号码不能为空！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        return
    }

    if (retrievePasswordFormValues.firstPassword != retrievePasswordFormValues.secondPassword) {
        ToastAndroid.showWithGravity(`两次输入的密码不一致`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        return
    }

    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/phone/${sendSMSFormValues.mobile}/password`
        const res = await httpRequest.put(url, {
            captcha: retrievePasswordFormValues.vCode,
            password: retrievePasswordFormValues.firstPassword
        })
        if (res.success) {
            ToastAndroid.showWithGravity(`密码修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: retrievePasswordActionTypes.Retrieve_SUCCESS, payload: {} })
            Actions.pop()
        } else {
            ToastAndroid.showWithGravity(`密码修改失败：${res.msg }！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: retrievePasswordActionTypes.Retrieve_FAILED, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        ToastAndroid.showWithGravity(`密码修改失败：${res.msg }！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        dispatch({ type: retrievePasswordActionTypes.Retrieve_ERROR, payload: { errorMsg: err } })
    }
}
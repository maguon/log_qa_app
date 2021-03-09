import * as httpRequest from '../../../util/HttpRequest'
import * as updatePasswordActionTypes from './UpdatePasswordActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'

export const updatePassword = () => async (dispatch, getState) => {
    const state = getState()
    const { confirmPassword, newPassword, oldPassword } = getFormValues('updatePasswordForm')(state)
    const { loginReducer: { data: { user: { uid } } } } = state
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    if (newPassword == confirmPassword) {
        try {
            const url = `${base_host}/user/${uid}/password`

            console.log("oldPassword",oldPassword)
            const res = await httpRequest.put(url, {
                originPassword: oldPassword,
                newPassword
            })
            if (res.success) {
                ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: updatePasswordActionTypes.change_Password_success, payload: {} })
            } else {
                ToastAndroid.showWithGravity(`修改失败1！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: updatePasswordActionTypes.change_Password_failed, payload: { failedMsg: res.msg } })
            }
        } catch (err) {
            ToastAndroid.showWithGravity(`修改失败2！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: updatePasswordActionTypes.change_Password_error, payload: { errorMsg: err } })
        }
    } else {
        ToastAndroid.showWithGravity(`两次输入的新密码不同!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}

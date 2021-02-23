import * as httpRequest from '../../../util/HttpRequest'
import * as personalCenterActionTypes from './PersonalCenterActionTypes'
import * as loginActionTypes from '../login//LoginActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'

export const updatePersonalImage = (param) => async (dispatch) => {   
    dispatch({ type: personalCenterActionTypes.Update_PersonalImage_waiting, payload: {} })
    try {
        const { communicationSettingReducer: { data: { base_host, file_host } } } = getState()
        const uploadUrl = `${file_host}/user/${param.uploadImage.requiredParam.userId}/image${ObjectToUrl(param.uploadImage.optionalParam)}`
        const uploadUrlRes = await httpRequest.postFile(uploadUrl, param.uploadImage.postParam)
        if (uploadUrlRes.success) {
            const updateAvatarImageUrl = `${base_host}/user/${param.updateAvatarImage.requiredParam.userId}/avatarImage`
            param.updateAvatarImage.putParam.avatarImage = uploadUrlRes.imageId
            const updateAvatarImageRes = await httpRequest.put(updateAvatarImageUrl, param.updateAvatarImage.putParam)
            if(updateAvatarImageRes.success){
                dispatch({ type: loginActionTypes.change_AvatarImage, payload: { avatar_image: uploadUrlRes.imageId } })
                dispatch({ type: personalCenterActionTypes.Update_PersonalImage_success, payload: { } })
                ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            }else{
                dispatch({ type: personalCenterActionTypes.Update_PersonalImage_failed, payload: { failedMsg: updateAvatarImageRes.msg } })
                ToastAndroid.showWithGravity(`修改失败！${updateAvatarImageRes.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            }
        } else {
            dispatch({ type: personalCenterActionTypes.Update_PersonalImage_failed, payload: { failedMsg: uploadUrlRes.msg } })
            ToastAndroid.showWithGravity(`修改失败！${uploadUrlRes.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: personalCenterActionTypes.Update_PersonalImage_error, payload: { errorMsg: err } })
        ToastAndroid.showWithGravity(`修改失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}
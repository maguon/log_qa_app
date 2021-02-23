import * as httpRequest from '../../../../util/HttpRequest'
import * as imageListForDemageActionTypes from './ImageListForDemageActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import {Actions} from 'react-native-router-flux'

export const getDamageImageList = (param) => async (dispatch, getState) => {
    const { id } = param
    try {
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const url = `${record_host}/damageRecord${ObjectToUrl({ damageId: id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: imageListForDemageActionTypes.get_DamageImageList_success, payload: {
                    demageImageList: res.result[0] ? res.result[0].damage_image : [],
                    videoUrl: res.result[0] && res.result[0].damage_video[0] ? res.result[0].damage_video[0].url : null
                }
            })
        } else {
            dispatch({ type: imageListForDemageActionTypes.get_DamageImageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: imageListForDemageActionTypes.get_DamageImageList_error, payload: { errorMsg: err } })
    }
}

export const getDamageImageListWaiting = () => (dispatch) => {
    dispatch({ type: imageListForDemageActionTypes.get_DamageImageList_waiting, payload: {} })
}

export const uploadDamageImageWaiting = () => (dispatch) => {
    dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_waiting, payload: {} })
}

export const uploadDamageImage = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { file_host, record_host } } } = getState()
        const { cameraReses, damageId } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image${ObjectToUrl({ imageType: 4 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindDamageUrl = `${record_host}/user/${user.uid}/damage/${damageId}/image`
                const bindDamageReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindDamageUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId
                })))
                const bindDamageSuccessReses = bindDamageReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => item.imageId)
                if (cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.show('提交成功！', 10)
                    dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_success, payload: { demageImageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.show(`部分提交成功：${bindDamageSuccessReses.length}/${cameraReses.length}`, 10)
                    dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_partSuccess, payload: { demageImageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.show('提交全部失败！', 10)
                    dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.show('提交全部失败！', 10)
                dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.show('拍照全部失败！', 10)
            dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.show(`提交全部失败！${err}`, 10)
        dispatch({ type: imageListForDemageActionTypes.upload_ImageAtDemage_error, payload: { errorMsg: err } })
    }
}


export const setIndexForUploadImageForDamage = param => (dispatch) => {
    const { index } = param
    dispatch({ type: imageListForDemageActionTypes.set_indexForUploadImageForDamage, payload: { index } })
}




export const uploadVideoForDamage = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid, type, real_name } } } } = getState()
        const { communicationSettingReducer: { data: { base_host, file_host, record_host } } } = getState()
        const { damageId } = param
        console.log('param',param)
        console.log('getState()',getState())
        const uploadVideoUrl = `${file_host}/user/${uid}/video${ObjectToUrl({ videoType: 1, userType: type })}`
        console.log('uploadVideoUrl',uploadVideoUrl)

        const uploadVideoRes = await httpRequest.postFile(uploadVideoUrl, {
            key: 'file',
            imageUrl: param.source,
            imageType: 'video/mp4',
            imageName: 'video.mp4'
        })
        console.log('uploadVideoRes',uploadVideoRes)

        if (uploadVideoRes.success) {
            const uploadVideoRecordUrl = `${record_host}/user/${uid}/damage/${damageId}/video`
            console.log('uploadVideoRecordUrl',uploadVideoRecordUrl)

            const uploadVideoRecordRes = await httpRequest.post(uploadVideoRecordUrl, {
                username: real_name,
                userId: uid,
                userType: type,
                url: uploadVideoRes.result.id
            })
            console.log('uploadVideoRecordRes',uploadVideoRecordRes)

            if (uploadVideoRecordRes.success) {
                dispatch({ type: imageListForDemageActionTypes.upload_videoForDamage_success, payload: { videoUrl: uploadVideoRes.result.id } })
                ToastAndroid.show('视频上传成功！', 10)
                Actions.pop()
            } else {
                dispatch({ type: imageListForDemageActionTypes.upload_videoForDamage_failed, payload: { failedMsg: res.msg } })
                ToastAndroid.show(`视频上传失败，${failedMsg}！`, 10)
            }
        }
    } catch (err) {
        dispatch({ type: imageListForDemageActionTypes.upload_videoForDamage_error, payload: { errorMsg: err } })
        ToastAndroid.show(`视频上传失败，${err}！`, 10)
    }
}

export const uploadVideoForDamageWaiting = () => (dispatch) => {
    dispatch({ type: imageListForDemageActionTypes.upload_videoForDamage_waiting, payload: {} })
}

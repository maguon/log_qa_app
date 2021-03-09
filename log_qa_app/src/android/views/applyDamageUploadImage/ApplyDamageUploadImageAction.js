import * as httpRequest from '../../../util/HttpRequest'
// import { base_host, file_host, record_host } from '../../../config/Host'
import { ToastAndroid } from 'react-native'
import * as applyDamageUploadImageActionTypes from './ApplyDamageUploadImageActionTypes'
import { Actions } from 'react-native-router-flux'
import { ObjectToUrl } from '../../../util/ObjectToUrl'

export const uploadImageForApplyDamageWaiting = () => (dispatch) => {
    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_waiting, payload: {} })
}

export const uploadImageForApplyDamage = reqParam => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { file_host, record_host } } } = getState()
        const cameraSuccessReses = reqParam.cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } },
                applyDamageSubmitReducer: { data: { damageId } } } = getState()
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
                if (reqParam.cameraReses.length === bindDamageSuccessReses.length) {
                    ToastAndroid.show('提交成功！', 10)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_success, payload: { imageList: bindDamageSuccessReses } })
                } else if (bindDamageSuccessReses.length > 0) {
                    ToastAndroid.show(`部分提交成功：${bindDamageSuccessReses.length}/${reqParam.cameraReses.length}`, 10)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_partSuccess, payload: { imageList: bindDamageSuccessReses, failedMsg: '部分失败' } })
                } else {
                    ToastAndroid.show('提交全部失败！', 10)
                    dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                ToastAndroid.show('提交全部失败！', 10)
                dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            ToastAndroid.show('拍照全部失败！', 10)
            dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        ToastAndroid.show(`提交全部失败！${err}`, 10)
        dispatch({ type: applyDamageUploadImageActionTypes.upload_DamageImage_error, payload: { errorMsg: err } })
    }
}


export const setIndexForUploadImageForApplyDamage = param => (dispatch) => {
    const { index } = param
    dispatch({ type: applyDamageUploadImageActionTypes.set_indexForUploadImageForApplyDamage, payload: { index } })
}

export const cleanUploadDamageImage = () => (dispatch) => {
    dispatch({ type: applyDamageUploadImageActionTypes.clean_upload_DamageImage, payload: {} })
    // dispatch({ type: applyDamageUploadImageActionTypes.clean_infoForCreateCar, payload: {} })
    // dispatch({ type: actionTypes.importForCreateCar.clean_importForCreateCar, payload: {} })
}

export const getImageForCreateCar = param => async (dispatch, getState) => {
    // try {

    //     const { loginReducer: { data: { user: { uid } } } } = getState()
    //     const url = `${record_host}/user/${uid}/car/${param.carId}/record`
    //     const res = await httpRequest.get(url)
    //     if (res.success) {
    //         dispatch({
    //             type: applyDamageUploadImageActionTypes.get_imageForCreateCar_success, payload: {
    //                 imageList: res.result[0] ? res.result[0].storage_image.map(item => item.url) : [],
    //                 recordId: res.result[0] ? res.result[0]._id : null,
    //                 videoUrl: res.result[0] && res.result[0].video[0] ? res.result[0].video[0].url : null
    //             }
    //         })
    //     } else {
    //         dispatch({ type: applyDamageUploadImageActionTypes.get_imageForCreateCar_failed, payload: { failedMsg: res.msg } })
    //     }
    // } catch (err) {
    //     dispatch({ type: applyDamageUploadImageActionTypes.get_imageForCreateCar_error, payload: { errorMsg: err } })
    // }
}

export const getImageForCreateCarWaiting = () => (dispatch) => {
    // dispatch({ type: applyDamageUploadImageActionTypes.get_imageForCreateCar_waiting, payload: {} })
}

export const uploadVideoForApplyDamage = param => async (dispatch, getState) => {
    console.log(param)
    try {
        const { loginReducer: { data: { user: { uid, type, real_name } } },
            applyDamageSubmitReducer: { data: { damageId } },
            communicationSettingReducer: { data: { file_host, record_host } } } = getState()

        // console.log('getState', getState())
        const uploadVideoUrl = `${file_host}/user/${uid}/video${ObjectToUrl({ videoType: 1, userType: type })}`
        // console.log('uploadVideoUrl', uploadVideoUrl)
        const uploadVideoRes = await httpRequest.postFile(uploadVideoUrl, {
            key: 'file',
            imageUrl: param.source,
            imageType: 'video/mp4',
            imageName: 'video.mp4'
        })
        // console.log('uploadVideoRes', uploadVideoRes)


        if (uploadVideoRes.success) {
            const uploadVideoRecordUrl = `${record_host}/user/${uid}/damage/${damageId}/video`
            // console.log('uploadVideoRecordUrl', uploadVideoRecordUrl)

            const uploadVideoRecordRes = await httpRequest.post(uploadVideoRecordUrl, {
                username: real_name,
                userId: uid,
                userType: type,
                url: uploadVideoRes.result.id
            })
            // console.log('uploadVideoRecordRes', uploadVideoRecordRes)
            if (uploadVideoRecordRes.success) {
                dispatch({ type: applyDamageUploadImageActionTypes.upload_videoForApplyDamage_success, payload: { videoUrl: uploadVideoRes.result.id } })
                ToastAndroid.show('视频上传成功！', 10)
                Actions.pop()
            } else {
                dispatch({ type: applyDamageUploadImageActionTypes.upload_videoForApplyDamage_failed, payload: { failedMsg: res.msg } })
                ToastAndroid.show(`视频上传失败，${failedMsg}！`, 10)
            }
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: applyDamageUploadImageActionTypes.upload_videoForApplyDamage_error, payload: { errorMsg: err } })
        ToastAndroid.show(`视频上传失败，${err}！`, 10)
    }
}

export const uploadVideoForApplyDamageWaiting = () => (dispatch) => {
    dispatch({ type: applyDamageUploadImageActionTypes.upload_videoForApplyDamage_waiting, payload: {} })
}

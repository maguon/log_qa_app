import * as httpRequest from '../../../util/HttpRequest'
import * as demageListActionTypes from './DemageListActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getDemageList = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const { communicationSettingReducer: { data: { base_host} } } = getState()
        const url = `${base_host}/damage${ObjectToUrl({ declareUserId: uid, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0 || res.result.length == 0) {
                dispatch({ type: demageListActionTypes.get_DemageList_success, payload: { demageList: res.result, isComplete: true } })
            } else {
                dispatch({ type: demageListActionTypes.get_DemageList_success, payload: { demageList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: demageListActionTypes.get_DemageList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: demageListActionTypes.get_DemageList_error, payload: { errorMsg: err } })
    }
}

export const getDemageListWaiting = () => (dispatch, getState) => {
    dispatch({ type: demageListActionTypes.get_DemageList_waiting, payload: {} })
}

export const getDemageListMore = () => async (dispatch, getState) => {

    const {
        loginReducer: { data: { user: { uid } } },
        demageListReducer: { data: { demageList, isComplete } },
        demageListReducer } = getState()
        const { communicationSettingReducer: { data: { base_host } } } = getState()
    if (demageListReducer.getDemageListMore.isResultStatus == 1) {
        await sleep(1000)
        getDemageListMore()(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: demageListActionTypes.get_DemageListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/damage${ObjectToUrl({ declareUserId: uid, start: demageList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: demageListActionTypes.get_DemageListMore_success,
                        payload: {
                            demageList: res.result,
                            isComplete: (res.result.length % pageSize != 0 || res.result.length == 0)
                        }
                    })
                } else {
                    dispatch({ type: demageListActionTypes.get_DemageListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: demageListActionTypes.get_DemageListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }

}
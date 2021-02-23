import * as  httpRequest from '../../../util/HttpRequest'
import * as searchCarActionTypes from './SearchCarActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getCarList = (param) => async (dispatch, getState) => {
    dispatch({ type: searchCarActionTypes.get_CarList_waiting, payload: {} })
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/carList${ObjectToUrl({ vinCode: param, start: 0, size: pageSize })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            if (res.result.length % pageSize != 0) {
                dispatch({ type: searchCarActionTypes.get_CarList_sucess, payload: { carList: res.result, isComplete: true } })
            } else {
                dispatch({ type: searchCarActionTypes.get_CarList_sucess, payload: { carList: res.result, isComplete: false } })
            }
        } else {
            dispatch({ type: searchCarActionTypes.get_CarList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: searchCarActionTypes.get_CarList_error, payload: { errorMsg: err } })
    }
}


export const getCarListMore = () => async (dispatch, getState) => {
    const state = getState()
    const { searchCarReducer: { data: { carList, isComplete } }, searchCarReducer } = state
    const { communicationSettingReducer: { data: { base_host } } } = getState()
    const { vinCode } = getFormValues('SearchCar')(state)
    if (searchCarReducer.getCarListMore.isResultStatus == 1) {
        await sleep(1000)
        getCarListMore(dispatch, getState)
    } else {
        if (!isComplete) {
            dispatch({ type: searchCarActionTypes.get_CarListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/carList${ObjectToUrl({ vinCode: vinCode, start: carList.length, size: pageSize })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    if (res.result.length % pageSize != 0 || res.result.length == 0) {
                        dispatch({ type: searchCarActionTypes.get_CarListMore_sucess, payload: { carList: res.result, isComplete: true } })
                    } else {
                        dispatch({ type: searchCarActionTypes.get_CarListMore_sucess, payload: { carList: res.result, isComplete: false } })
                    }
                } else {
                    dispatch({ type: searchCarActionTypes.get_CarListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: searchCarActionTypes.get_CarListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.showWithGravity('已全部加载完毕！', ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    }
}
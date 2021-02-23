import * as httpRequest from '../../../util/HttpRequest'
import * as checkVehicleAllListActionTypes from './checkVehicleAllListActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getCheckVehicleAllList = req => async (dispatch, getState) => {
    try {
        let searchParam = {}
        if (req) {
            searchParam = {
                startDate: req.startDate ? req.startDate : null,
                endDate: req.endDate ? req.startDate : null
            }
        }
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${record_host}/opRecord${ObjectToUrl({
            userId: uid,
            op: 10,
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: checkVehicleAllListActionTypes.get_checkVehicleAllList_success, payload: {
                    checkVehicleAllList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: req ? req : null
                }
            })
        } else {
            dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCheckVehicleAllListWaiting = () => (dispatch) => {
    dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllList_waiting, payload: {} })
}

export const getCheckVehicleAllListMore = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } },
        checkVehicleAllListRudcer: { data: { checkVehicleAllList, isComplete, search } },
        checkVehicleAllListRudcer } = getState()
    const { communicationSettingReducer: { data: { record_host } } } = getState()
    let searchParam = {}
    if (search) {
        searchParam = {
            startDate: search.startDate ? search.startDate : null,
            endDate: search.endDate ? search.startDate : null
        }
    }
    if (checkVehicleAllListRudcer.getCheckVehicleAllListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCheckVehicleAllListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllListMore_waiting, payload: {} })
            try {
                const url = `${record_host}/opRecord${ObjectToUrl({
                    userId: uid,
                    op: 10,
                    start: checkVehicleAllList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: checkVehicleAllListActionTypes.get_checkVehicleAllListMore_success, payload: {
                            checkVehicleAllList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                            search
                        }
                    })
                } else {
                    dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                dispatch({ type: checkVehicleAllListActionTypes.get_checkVehicleAllListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}

export const setModalVisible = param => (dispatch) => {
    dispatch({ type: checkVehicleAllListActionTypes.setModalVisible, payload: { isModalVisible: param.isModalVisible } })
}

export const cleanCheckVehicleAllList = () => (dispatch) => {
    dispatch({ type: checkVehicleAllListActionTypes.clean_checkVehicleAllList, payload: {} })
}
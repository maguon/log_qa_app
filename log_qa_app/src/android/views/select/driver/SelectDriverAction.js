import * as httpRequest from '../../../../util/HttpRequest'
import * as selectDriverActionTypes from './SelectDriverActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getSelectDriverList = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/drive?driveStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: selectDriverActionTypes.get_SelectDriverList_sucess, payload: { driverList: res.result } })
        } else {
            dispatch({ type: selectDriverActionTypes.get_SelectDriverList_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: selectDriverActionTypes.get_SelectDriverList_error, payload: { errorMsg: err } })
    }
}

export const getSelectDriverListWaiting = () => (dispatch) => {
    dispatch({ type: selectDriverActionTypes.get_SelectDriverList_waiting, payload: {} })
}

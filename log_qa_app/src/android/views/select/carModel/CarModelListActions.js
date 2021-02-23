import * as httpRequest from '../../../../util/HttpRequest'
import * as carModelListActionTypes from './CarModelListActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getCarModelList = param => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const url = `${base_host}/carMake/${param.make_id}/carModel`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: carModelListActionTypes.get_CarModelList_success, payload: { carModelList: res.result } })
        } else {
            dispatch({ type: carModelListActionTypes.get_CarModelList_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: carModelListActionTypes.get_CarModelList_error, payload: { errorMsg: err } })
    }
}

export const getCarModelListWaiting = () => (dispatch) => {
    dispatch({ type: carModelListActionTypes.get_CarModelList_waiting, payload: {} })
}

import * as httpRequest from '../../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../../config/Host'
import * as carDetailActionTypes from './CarDetailActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'

export const getCarDetail = (param) => async (dispatch, getState) => {
    const { car_id } = param
    try {
        const url = `${base_host}/carList${ObjectToUrl({ carId: car_id })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: carDetailActionTypes.get_carDetail_success, payload: { carDetail: res.result[0] } })
        } else {
            dispatch({ type: carDetailActionTypes.get_carDetail_failed, payload: { failedMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: carDetailActionTypes.get_carDetail_error, payload: { errorMsg: err } })
    }
}

export const getCarDetailWaiting = () => (dispatch) => {
    dispatch({ type: carDetailActionTypes.get_carDetail_waiting, payload: {} })
}


// export const getCarDetailResetStatus = () => (dispatch) => {
//     dispatch({ type: carDetailActionTypes.get_carDetail_resetStatus, payload: {} })
// }
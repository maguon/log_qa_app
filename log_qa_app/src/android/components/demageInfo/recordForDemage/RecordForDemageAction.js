import * as httpRequest from '../../../../util/HttpRequest'
import * as recordForDemageActionTypes from './RecordForDemageActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'


export const getCarInfoRecord = (param) => async (dispatch, getState) => {
    const { car_id ,vin} = param
    const { loginReducer: { data: { user: { uid } } } } = getState()
    try {
        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const url = `${record_host}/user/${uid}/car/${car_id}/record`
        // console.log('url', url)
        // console.log('param', param)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            let recordList = []
            if (res.result.length > 0) {
                const record = res.result.find(item => item.vin == vin)
                if (record) {
                    recordList = record.comment ? record.comment : []
                }
            }
            
            dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_success, payload: { carInfoRecord: recordList }})
        } else {
            dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_failed, payload: { errorMsg: res.msg } })
        }
    }
    catch (err) {
        dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_error, payload: { errorMsg: err } })
    }
}

export const getCarInfoRecordWaiting = () => (dispatch) => {
    dispatch({ type: recordForDemageActionTypes.get_RecordForDemage_waiting, payload: {} })
}
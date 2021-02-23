import * as httpRequest from '../../../util/HttpRequest'
import * as carSortActionTypes from './carSortActionTypes'
import { ObjectToUrl } from '../../../util/ObjectToUrl'
import { ToastAndroid } from 'react-native'
import { sleep } from '../../../util/util'

const pageSize = 50

export const getCarSortList = req => async (dispatch, getState) => {
    let searchParam = {}
    let newtype=17
    if (req) {
        searchParam = {
            startDate: req.startDate ? req.startDate : null,
            endDate: req.endDate ? req.endDate : null
        }
        if(searchParam.startDate||searchParam.endDate){
            const {carSortReducer: { data: {type} } } = getState()
            newtype=type
        }else {
            newtype=(req.index==0?17:(req.index==1?11:13))
        }
    }
    // console.log('req', req)
    dispatch({ type: carSortActionTypes.get_type, payload: { type:newtype } })
    try {

        const { communicationSettingReducer: { data: { record_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } }, carSortReducer: { data: {type} } } = getState()
        const url = `${record_host}/opRecord${ObjectToUrl({
            userId: uid,
            op: type,
            start: 0,
            size: pageSize,
            ...searchParam
        })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)

        if (res.success) {
            dispatch({
                type: carSortActionTypes.get_carSortList_success, payload: {
                    carSortList: res.result,
                    isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                    search: req ? req : null
                }
            })
        } else {
            dispatch({ type: carSortActionTypes.get_carSortList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        // console.log('err', err)

        dispatch({ type: carSortActionTypes.get_carSortList_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCarSortListWaiting = () => (dispatch) => {
    dispatch({ type: carSortActionTypes.get_carSortList_waiting, payload: {} })
}

export const getCarSortListMore = () => async (dispatch, getState) => {
    const { loginReducer: { data: { user: { uid } } },
        carSortReducer: { data: { carSortList, isComplete, search,type } },
        carSortReducer } = getState()
    const { communicationSettingReducer: { data: { record_host } } } = getState()
    let searchParam = {}
    if (search) {
        searchParam = {
            startDate: search.startDate ? search.startDate : null,
            endDate: search.endDate ? search.startDate : null
        }
    }
    if (carSortReducer.getCarSortListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getCarSortListMore)
    } else {
        if (!isComplete) {
            dispatch({ type: carSortActionTypes.get_carSortListMore_waiting, payload: {} })
            try {
                const url = `${record_host}/opRecord${ObjectToUrl({
                    userId: uid,
                    op: type,
                    start: carSortList.length,
                    size: pageSize,
                    ...searchParam
                })}`
                console.log('url', url)
                const res = await httpRequest.get(url)
                // console.log('res', res)
                if (res.success) {
                    dispatch({
                        type: carSortActionTypes.get_carSortListMore_success, payload: {
                            carSortList: res.result,
                            isComplete: (res.result.length == 0 || res.result.length % pageSize != 0),
                            search
                        }
                    })
                } else {
                    dispatch({ type: carSortActionTypes.get_carSortListMore_failed, payload: { failedMsg: res.msg } })
                }
            } catch (err) {
                // console.log('err', err)

                dispatch({ type: carSortActionTypes.get_carSortListMore_error, payload: { errorMsg: err } })
            }
        } else {
            ToastAndroid.show('已全部加载完毕！', 10)
        }
    }
}

export const setModalVisible = param => (dispatch) => {
    dispatch({ type: carSortActionTypes.setModalVisible_carSortList, payload: { isModalVisible: param.isModalVisible } })
}

export const cleanCarSortList = () => (dispatch) => {
    dispatch({ type: carSortActionTypes.clean_carSortList, payload: {} })
}

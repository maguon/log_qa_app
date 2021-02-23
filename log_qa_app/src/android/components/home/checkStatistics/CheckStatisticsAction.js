import * as httpRequest from '../../../../util/HttpRequest'
import * as checkStatisticsActionTypes from './CheckStatisticsActionTypes'
import { ObjectToUrl } from '../../../../util/ObjectToUrl'
import moment from 'moment'

export const getCheckStatistics = () => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } } } = getState()
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const urls = [`${base_host}/damageNotCheckCount${ObjectToUrl({ declareUserId: uid, yearMonth: moment().format('YYYYMM') })}`,
            `${base_host}/user/${uid}/damageQaTaskDayStat${ObjectToUrl({qaUserId:uid,dateId:moment().format('YYYYMMDD') })}`]
        const res = await Promise.all(urls.map(url => httpRequest.get(url)))
        if (res[0].success && res[1].success) {
            dispatch({
                type: checkStatisticsActionTypes.get_checkStatistics_success, payload: {
                    d_count: res[0].result.reduce((acc, cur) => acc + cur.damage_count, 0),
                    check_count: res[1].result[0].qa_count
                }
            })
        } else {
            dispatch({ type: checkStatisticsActionTypes.get_checkStatistics_failed, payload: { failedMsg: `${res[0].msg}${res[1].msg}` } })
        }
    }
    catch (err) {
        dispatch({ type: checkStatisticsActionTypes.get_checkStatistics_error, payload: { errorMsg: err } })
    }
}


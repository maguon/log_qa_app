import { handleActions } from 'redux-actions'
import * as checkStatisticsActionTypes from './CheckStatisticsActionTypes'
import { isEqualDispatch } from '../../../../util/IsObjectValueEqual'

const initialState = {
    data: {
        d_count: 0,
        check_count: 0
    },
    getCheckStatistics: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [checkStatisticsActionTypes.get_checkStatistics_success]: (state, action) => {
        const { payload: { d_count, check_count }, payload } = action
        if (!isEqualDispatch(payload, state.data)) {
            return {
                ...state,
                data: {
                    d_count,
                    check_count
                },
                getCheckStatistics: {
                    ...initialState.getCheckStatistics,
                    isResultStatus: 2,
                }
            }
        } else if (state.getCheckStatistics.isResultStatus != 2) {
            state.getCheckStatistics.isResultStatus = 2
            return state
        } else {
            return state
        }
    },
    [checkStatisticsActionTypes.get_checkStatistics_waiting]: (state, action) => {
        return {
            ...state,
            getCheckStatistics: {
                ...initialState.getCheckStatistics,
                isResultStatus: 1,
            }
        }
    },
    [checkStatisticsActionTypes.get_checkStatistics_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCheckStatistics: {
                ...initialState.getCheckStatistics,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [checkStatisticsActionTypes.get_checkStatistics_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCheckStatistics: {
                ...initialState.getCheckStatistics,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
import { handleActions } from 'redux-actions'
import * as TodayCheckType from './TodayCheckType'

const initialState = {
    data: {
        todayCheckList: [],
        isComplete:""
    },
    getTodayCheckList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getTodayCheckMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [TodayCheckType.get_TodayCheck_success]: (state, action) => {
        const { payload: { todayCheckList ,isComplete} } = action
        return {
            ...state,
            data: {
                todayCheckList,
                isComplete
            },
            getTodayCheckList: {
                ...initialState.getTodayCheckList,
                isResultStatus: 2
            }
        }
    },
    [TodayCheckType.get_TodayCheck_waiting]: (state, action) => {
        return {
            ...state,
            getTodayCheckList: {
                ...initialState.getTodayCheckList,
                isResultStatus: 1,
            }
        }
    },
    [TodayCheckType.get_TodayCheck_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTodayCheckList: {
                ...initialState.getTodayCheckList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [TodayCheckType.get_TodayCheck_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTodayCheckList: {
                ...initialState.getTodayCheckList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [(TodayCheckType.get_TodayCheckMore_success)]: (state, action) => {
        const { payload: { todayCheckList, isComplete } } = action
        return {
            ...state,
            data: {
                ...state.data,
                todayCheckList: [...state.data.todayCheckList, ...todayCheckList],
                isComplete
            },
            getTodayCheckMore: {
                ...initialState.getTodayCheckMore,
                isResultStatus: 2
            }
        }
    },
    [(TodayCheckType.get_TodayCheckMore_waiting)]: (state, action) => {
        return {
            ...state,
            getTodayCheckMore: {
                ...initialState.getTodayCheckMore,
                isResultStatus: 1,
            }
        }
    },
    [(TodayCheckType.get_TodayCheckMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getTodayCheckMore: {
                ...initialState.getTodayCheckMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(TodayCheckType.get_TodayCheckMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getTodayCheckMore: {
                ...initialState.getTodayCheckMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)
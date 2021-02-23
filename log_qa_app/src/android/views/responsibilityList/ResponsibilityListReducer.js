import { handleActions } from 'redux-actions'
import * as responsibilityListActionTypes from './ResponsibilityListActionTypes'

const initialState = {
    data: {
        responsibilityList: [],
        isComplete: false
    },
    getResponsibilityListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getResponsibilityList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [responsibilityListActionTypes.get_ResponsibilityList_success]: (state, action) => {
        const { payload: { responsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                responsibilityList,
                isComplete
            },
            getResponsibilityList: {
                ...initialState.getResponsibilityList,
                isResultStatus: 2
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityList_waiting]: (state, action) => {
        return {
            ...state,
            getResponsibilityList: {
                ...initialState.getResponsibilityList,
                isResultStatus: 1,
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getResponsibilityList: {
                ...initialState.getResponsibilityList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getResponsibilityList: {
                ...initialState.getResponsibilityList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [responsibilityListActionTypes.get_ResponsibilityListMore_success]: (state, action) => {
        const { payload: { responsibilityList, isComplete } } = action
        return {
            ...state,
            data: {
                responsibilityList: [...state.data.responsibilityList, ...responsibilityList],
                isComplete
            },
            getResponsibilityListMore: {
                ...initialState.getResponsibilityListMore,
                isResultStatus: 2
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityListMore_waiting]: (state, action) => {
        return {
            ...state,
            getResponsibilityListMore: {
                ...initialState.getResponsibilityListMore,
                isResultStatus: 1,
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getResponsibilityListMore: {
                ...initialState.getResponsibilityListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [responsibilityListActionTypes.get_ResponsibilityListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getResponsibilityListMore: {
                ...initialState.getResponsibilityListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }

}, initialState)
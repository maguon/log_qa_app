import { handleActions } from 'redux-actions'
import * as demageListActionTypes from './DemageListActionTypes'

const initialState = {
    data: {
        demageList: [],
        isComplete: false
    },
    getDemageList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getDemageListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [demageListActionTypes.get_DemageList_success]: (state, action) => {
        const { payload: { demageList, isComplete } } = action
        return {
            ...state,
            data: {
                demageList,
                isComplete
            },
            getDemageList: {
                ...initialState.getDemageList,
                isResultStatus: 2
            }
        }
    },
    [demageListActionTypes.get_DemageList_waiting]: (state, action) => {
        return {
            ...state,
            getDemageList: {
                ...initialState.getDemageList,
                isResultStatus: 1,
            }
        }
    },
    [demageListActionTypes.get_DemageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDemageList: {
                ...initialState.getDemageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [demageListActionTypes.get_DemageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDemageList: {
                ...initialState.getDemageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [demageListActionTypes.get_DemageListMore_success]: (state, action) => {
        const { payload: { demageList, isComplete } } = action
        return {
            ...state,
            data: {
                demageList: [...state.data.demageList, ...demageList],
                isComplete
            },
            getDemageListMore: {
                ...initialState.getDemageListMore,
                isResultStatus: 2
            }
        }
    },
    [demageListActionTypes.get_DemageListMore_waiting]: (state, action) => {
        return {
            ...state,
            getDemageListMore: {
                ...initialState.getDemageListMore,
                isResultStatus: 1,
            }
        }
    },
    [demageListActionTypes.get_DemageListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDemageListMore: {
                ...initialState.getDemageListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [demageListActionTypes.get_DemageListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDemageListMore: {
                ...initialState.getDemageListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [demageListActionTypes.update_Demage]: (state, action) => {
        const { payload: { id, truck_id, truck_num, drive_id, drive_name, damage_explain } } = action    
        return {
            ...state,
            data: {
                ...state.data,
                demageList: state.data.demageList.map(item => {
                    if (item.id == id) {
                        item = {
                            ...item,
                            truck_id,
                            truck_num,
                            drive_id,
                            drive_name,
                            damage_explain
                        }
                    }
                    return item
                })
            }
        }
    }

}, initialState)
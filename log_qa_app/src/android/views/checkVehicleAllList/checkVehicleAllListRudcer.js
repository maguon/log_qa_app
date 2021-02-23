import { handleActions } from 'redux-actions'
import * as checkVehicleAllListActionTypes from './checkVehicleAllListActionTypes'


const initialState = {
    data: {
        checkVehicleAllList: [],
        isComplete: false,
        search: {},
        isModalVisible:false
    },
    getCheckVehicleAllList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getCheckVehicleAllListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [checkVehicleAllListActionTypes.get_checkVehicleAllList_success]: (state, action) => {
        const { payload: { checkVehicleAllList, isComplete, search } } = action
        return {
            ...state,
            data: {
                ...state.data,
                checkVehicleAllList,
                isComplete,
                search
            },
            getCheckVehicleAllList: {
                ...initialState.getCheckVehicleAllList,
                isResultStatus: 2,
            }
        }
    },
    [checkVehicleAllListActionTypes.get_checkVehicleAllList_waiting]: (state, action) => {
        return {
            ...state,
            getCheckVehicleAllList: {
                ...initialState.getCheckVehicleAllList,
                isResultStatus: 1,
            }
        }
    },
    [checkVehicleAllListActionTypes.get_checkVehicleAllList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCheckVehicleAllList: {
                ...initialState.getCheckVehicleAllList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [checkVehicleAllListActionTypes.get_checkVehicleAllList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCheckVehicleAllList: {
                ...initialState.getCheckVehicleAllList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },






    [(checkVehicleAllListActionTypes.get_checkVehicleAllListMore_success)]: (state, action) => {
        const { payload: { checkVehicleAllList, isComplete, search } } = action
        return {
            ...state,
            data: {
                ...state.data,
                checkVehicleAllList: [...state.data.checkVehicleAllList, ...checkVehicleAllList],
                isComplete,
                search
            },
            getCheckVehicleAllListMore: {
                ...initialState.getCheckVehicleAllListMore,
                isResultStatus: 2
            }
        }
    },
    [(checkVehicleAllListActionTypes.get_checkVehicleAllListMore_waiting)]: (state, action) => {
        return {
            ...state,
            getCheckVehicleAllListMore: {
                ...initialState.getCheckVehicleAllListMore,
                isResultStatus: 1,
            }
        }
    },
    [(checkVehicleAllListActionTypes.get_checkVehicleAllListMore_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCheckVehicleAllListMore: {
                ...initialState.getCheckVehicleAllListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(checkVehicleAllListActionTypes.get_checkVehicleAllListMore_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCheckVehicleAllListMore: {
                ...initialState.getCheckVehicleAllListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [(checkVehicleAllListActionTypes.setModalVisible)]: (state, action) => {
        const { payload: { isModalVisible } } = action
        return {
            ...state,
            data:{
                ...state.data,
                isModalVisible
            }
        }
    },


    [(checkVehicleAllListActionTypes.clean_checkVehicleAllList)]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)
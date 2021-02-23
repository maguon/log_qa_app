import { handleActions } from 'redux-actions'
import * as carSortActionTypes from './carSortActionTypes'


const initialState = {
    data: {
        carSortList: [],
        isComplete: false,
        search: {},
        isModalVisible:false,
        type:0
    },
    getCarSortList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getCarSortListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [carSortActionTypes.get_carSortList_success]: (state, action) => {
        const { payload: { carSortList, isComplete, search } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carSortList,
                isComplete,
                search
            },
            getCarSortList: {
                ...initialState.getCarSortList,
                isResultStatus: 2,
            }
        }
    },
    [carSortActionTypes.get_carSortList_waiting]: (state, action) => {
        return {
            ...state,
            getCarSortList: {
                ...initialState.getCarSortList,
                isResultStatus: 1,
            }
        }
    },
    [carSortActionTypes.get_carSortList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarSortList: {
                ...initialState.getCarSortList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [carSortActionTypes.get_carSortList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarSortList: {
                ...initialState.getCarSortList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },






    [carSortActionTypes.get_carSortListMore_success]: (state, action) => {
        const { payload: { carSortList, isComplete, search } } = action
        return {
            ...state,
            data: {
                ...state.data,
                carSortList: [...state.data.carSortList, ...carSortList],
                isComplete,
                search
            },
            getCarSortListMore: {
                ...initialState.getCarSortListMore,
                isResultStatus: 2
            }
        }
    },
    [carSortActionTypes.get_carSortListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCarSortListMore: {
                ...initialState.getCarSortListMore,
                isResultStatus: 1,
            }
        }
    },
    [carSortActionTypes.get_carSortListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarSortListMore: {
                ...initialState.getCarSortListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [carSortActionTypes.get_carSortListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarSortListMore: {
                ...initialState.getCarSortListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [carSortActionTypes.setModalVisible_carSortList]: (state, action) => {
        const { payload: { isModalVisible } } = action
        return {
            ...state,
            data:{
                ...state.data,
                isModalVisible
            }
        }
    },


    [carSortActionTypes.clean_carSortList]: (state, action) => {
        return {
            ...initialState
        }
    },
    [carSortActionTypes.get_type]: (state, action) => {
        const { payload: { type } } = action
        return {
            ...state,
            data:{
                ...state.data,
                type
            }
        }
    }
}, initialState)

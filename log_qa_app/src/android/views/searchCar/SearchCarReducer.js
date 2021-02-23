import { handleActions } from 'redux-actions'
import * as searchCarActionTypes from './SearchCarActionTypes'

const initialState = {
    data: {
        carList: [],
        isComplete: false
    },
    getCarList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    getCarListMore: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [searchCarActionTypes.get_CarList_sucess]: (state, action) => {
        const { payload: { carList, isComplete } } = action
        return {
            ...state,
            data: {
                carList,
                isComplete
            },
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 2
            }
        }
    },
    [searchCarActionTypes.get_CarList_waiting]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 1,
            }
        }
    },
    [searchCarActionTypes.get_CarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [searchCarActionTypes.get_CarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarList: {
                ...initialState.getCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [searchCarActionTypes.get_CarListMore_sucess]: (state, action) => {
        const { payload: { carList, isComplete } } = action
        return {
            ...state,
            data: {
                carList: [...state.data.carList, ...carList],
                isComplete
            },
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 2
            }
        }
    },
    [searchCarActionTypes.get_CarListMore_waiting]: (state, action) => {
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 1,
            }
        }
    },
    [searchCarActionTypes.get_CarListMore_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [searchCarActionTypes.get_CarListMore_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarListMore: {
                ...initialState.getCarListMore,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
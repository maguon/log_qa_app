import { handleActions } from 'redux-actions'
import * as carModelListActionTypes from './CarModelListActionTypes'
import { isEqualDispatch } from '../../../../util/IsObjectValueEqual'

const initialState = {
    data: {
        carModelList: []
    },
    getCarModelList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [carModelListActionTypes.get_CarModelList_success]: (state, action) => {
        const { payload: { carModelList } } = action
        return {
            ...state,
            data: {
                carModelList
            },
            getCarModelList: {
                ...initialState.getCarModelList,
                isResultStatus: 2
            }
        }
    },
    [carModelListActionTypes.get_CarModelList_waiting]: (state, action) => {
        return {
            ...state,
            getCarModelList: {
                ...initialState.getCarModelList,
                isResultStatus: 1,
            }
        }
    },
    [carModelListActionTypes.get_CarModelList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarModelList: {
                ...initialState.getCarModelList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [carModelListActionTypes.get_CarModelList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarModelList: {
                ...initialState.getCarModelList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
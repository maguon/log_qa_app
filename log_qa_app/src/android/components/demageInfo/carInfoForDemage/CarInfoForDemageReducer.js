import { handleActions } from 'redux-actions'
import * as carInfoForDemageActionTypes from './CarInfoForDemageActionTypes'

const initialState = {
    data:{
        carInfo:{}
    },
    getCarInfo:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [carInfoForDemageActionTypes.get_CarInfoForDemage_success]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data: {
                carInfo
            },
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 2,
            }
        }
    },
    [carInfoForDemageActionTypes.get_CarInfoForDemage_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 1,
            }
        }
    },
    [carInfoForDemageActionTypes.get_CarInfoForDemage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [carInfoForDemageActionTypes.get_CarInfoForDemage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
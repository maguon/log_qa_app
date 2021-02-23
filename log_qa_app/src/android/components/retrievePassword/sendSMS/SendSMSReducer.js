import { handleActions } from 'redux-actions'
import * as sendSMSActionTypes from './SendSMSActionTypes'

const initialState = {
    data: {
        countDownTime:60
    },
    getVCode:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [sendSMSActionTypes.get_VCode_success]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode,
                isResultStatus: 2
            }
        }
    },
    [sendSMSActionTypes.get_VCode_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [sendSMSActionTypes.get_VCode_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [sendSMSActionTypes.get_VCode_waiting]: (state, action) => {
        return {
            ...state,
            getVCode: {
                ...initialState.getVCode,
                isResultStatus: 1
            }
        }
    },




    [sendSMSActionTypes.sendSMS_waiting]: (state, action) => {
        const { payload: { countDownTime } } = action
        return {
            ...state,
            data:{
                countDownTime
            }
        }
    }
}, initialState)
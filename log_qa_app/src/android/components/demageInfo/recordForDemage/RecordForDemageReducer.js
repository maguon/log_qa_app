import { handleActions } from 'redux-actions'
import * as recordForDemageActionTypes from './RecordForDemageActionTypes'

const initialState = {
    data: {
        carInfoRecord: {}
    },
    getCarInfoRecord: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }

}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [recordForDemageActionTypes.get_RecordForDemage_success]: (state, action) => {
        const { payload: { carInfoRecord } } = action
        return {
            ...state,
            data: {
                carInfoRecord
            },
            getCarInfoRecord: {
                ...initialState.getCarInfoRecord,
                isResultStatus: 2,
            }
        }
    },
    [recordForDemageActionTypes.get_RecordForDemage_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfoRecord: {
                ...initialState.getCarInfoRecord,
                isResultStatus: 1,
            }
        }
    },
    [recordForDemageActionTypes.get_RecordForDemage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarInfoRecord: {
                ...initialState.getCarInfoRecord,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [recordForDemageActionTypes.get_RecordForDemage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarInfoRecord: {
                ...initialState.getCarInfoRecord,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
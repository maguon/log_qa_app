import { handleActions } from 'redux-actions'
import * as selectDriverActionTypes from './SelectDriverActionTypes'
import { isEqualDispatch } from '../../../../util/IsObjectValueEqual'

const initialState = {
    data: {
        driverList: []
    },
    getSelectDriverList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [selectDriverActionTypes.get_SelectDriverList_sucess]: (state, action) => {
        const { payload: { driverList } } = action
        return {
            ...state,
            data: {
                driverList
            },
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 2
            }
        }
    },
    [selectDriverActionTypes.get_SelectDriverList_waiting]: (state, action) => {
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 1,
            }
        }
    },
    [selectDriverActionTypes.get_SelectDriverList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [selectDriverActionTypes.get_SelectDriverList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getSelectDriverList: {
                ...initialState.getSelectDriverList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
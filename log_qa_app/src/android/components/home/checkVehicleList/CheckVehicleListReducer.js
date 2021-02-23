import { handleActions } from 'redux-actions'
import * as checkVehicleListActionTypes from './CheckVehicleListActionTypes'
import { isEqualDispatch } from '../../../../util/IsObjectValueEqual'

const initialState = {
    data: {
        checkVehicleList: []
    },
    getCheckVehicleList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [checkVehicleListActionTypes.get_checkVehicleList_success]: (state, action) => {
        const { payload: { checkVehicleList } } = action
        return {
            ...state,
            data: {
                checkVehicleList
            },
            getCheckVehicleList: {
                ...initialState.getCheckVehicleList,
                isResultStatus: 2,
            }
        }
    },
    [checkVehicleListActionTypes.get_checkVehicleList_waiting]: (state, action) => {
        return {
            ...state,
            getCheckVehicleList: {
                ...initialState.getCheckVehicleList,
                isResultStatus: 1,
            }
        }
    },
    [checkVehicleListActionTypes.get_checkVehicleList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCheckVehicleList: {
                ...initialState.getCheckVehicleList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [checkVehicleListActionTypes.get_checkVehicleList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCheckVehicleList: {
                ...initialState.getCheckVehicleList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
}, initialState)
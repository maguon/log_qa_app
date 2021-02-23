import { handleActions } from 'redux-actions'
import * as retrievePasswordActionTypes from './RetrievePasswordActionTypes'

const initialState = {
        //isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
        retrieve: {
            isResultStatus: 0,
            errorMsg: '',
            failedMsg: ''
        }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [retrievePasswordActionTypes.Retrieve_SUCCESS]: (state, action) => {
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 2
            }
        }
    },
    [retrievePasswordActionTypes.Retrieve_FAILED]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [retrievePasswordActionTypes.Retrieve_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isExecStatus: 1
            }
        }
    },
    [retrievePasswordActionTypes.Retrieve_ERROR]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            retrieve: {
                ...state.retrieve,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)
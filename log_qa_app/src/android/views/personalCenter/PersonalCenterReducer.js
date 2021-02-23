import { handleActions } from 'redux-actions'
import * as personalCenterActionTypes from './PersonalCenterActionTypes'

const initialState = {
    updatePersonalImage:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [(personalCenterActionTypes.Update_PersonalImage_success)]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 2
            }
        }
    },
    [(personalCenterActionTypes.Update_PersonalImage_failed)]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [(personalCenterActionTypes.Update_PersonalImage_error)]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updatePersonalImage: {
                ...state.updatePersonalImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },
    [(personalCenterActionTypes.Update_PersonalImage_waiting)]: (state, action) => {
        return {
            ...initialState,
            updatePersonalImage: {
                ...initialState.updatePersonalImage,
                isResultStatus: 1
            }
        }
    },
}, initialState)
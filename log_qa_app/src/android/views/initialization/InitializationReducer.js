import { handleActions } from 'redux-actions'
import * as initializationActionTypes from './InitializationActionTypes'

const initialState = {
    data: {
        version: {
            currentVersion: '',
            newestVersion: '',
            force_update: 0,//0(版本为最新版), 1(版本需要太旧，强制更新), 2(版本需要太旧，但不需要强制更新)
            url: '',
            remark: ''
        }
    },
    initAPP: {
        isResultStatus: 0,     //执行状态 : 0(未执行), 1(正在执行),2(执行结束)
        step: 0,               //第N步已经执行成功
    },
    //validateVersion.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateVersion: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: ''
    },
    //loadLocalStorage.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(本地数据未找到)
    loadLocalStorage: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    //validateToken.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败), 5(网络错误)
    validateToken: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
        networkError: '',
        param:{}
    }
}

export default handleActions({
    [initializationActionTypes.INIT_App_Waiting]: (state, action) => {
        return {
            ...initialState,
            data: {
                ...state.data
            },
            initAPP: {
                ...state.initAPP,
                isResultStatus: 1,
            }
        }
    },


    [initializationActionTypes.Valdate_Version_Error]: (state, action) => {
        const { payload: { errorMsg, step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 3,
                errorMsg: '系统内部错误，请联系系统管理员！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.Valdate_Version_NetWorkError]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 5,
                networkError: '网络错误，请检查网络后重试！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.Valdate_Version_Success]: (state, action) => {
        const { payload: { data, step } } = action
        return {
            ...state,
            data: {
                version: {
                    ...state.data.version,
                    ...data
                }
            },
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: data.force_update != 1 ? 1 : 2,
                step
            }
        }
    },
    [initializationActionTypes.Valdate_Version_Failed]: (state, action) => {
        const { payload: { failedMsg, step } } = action
        return {
            ...state,
            validateVersion: {
                ...initialState.validateVersion,
                isResultStatus: 4,
                failedMsg
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },


    [initializationActionTypes.Load_LocalStorage_Success]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: 1,
                step
            }
        }
    },
    [initializationActionTypes.Load_LocalStorage_Failed]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 4,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.Load_LocalStorage_NotFoundError]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 5,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.Load_LocalStorage_Error]: (state, action) => {
        const { payload: { errorMsg, step } } = action
        return {
            ...state,
            validateVersion:{...initialState.validateVersion},
            loadLocalStorage: {
                ...initialState.loadLocalStorage,
                isResultStatus: 3,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },


    [initializationActionTypes.validate_token_Error]: (state, action) => {
        const { payload: {step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 3
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.validate_token_Success]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 2,
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.validate_token_Failed]: (state, action) => {
        const { payload: { step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                failedMsg: data,
                isResultStatus: 4
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    },
    [initializationActionTypes.validate_token_NetWorkError]: (state, action) => {
        const { payload: { param, step } } = action
        return {
            ...state,
            loadLocalStorage:{...initialState.loadLocalStorage},
            validateToken: {
                ...initialState.validateToken,
                isResultStatus: 5,
                param,
                networkError:'网络错误，请检查网络后重试！'
            },
            initAPP: {
                isResultStatus: 2,
                step
            }
        }
    }
}, initialState)




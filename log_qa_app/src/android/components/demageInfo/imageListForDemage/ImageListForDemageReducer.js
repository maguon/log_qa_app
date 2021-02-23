import { handleActions } from 'redux-actions'
import * as imageListForDemageActionTypes from './ImageListForDemageActionTypes'

const initialState = {
    data: {
        demageImageList: [],
        videoUrl: null,
        recordId: 0,
        index: 0
    },
    getDamageImageList: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadImageForDamage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadDamageImage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [imageListForDemageActionTypes.get_DamageImageList_success]: (state, action) => {
        const { payload: { demageImageList,videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                videoUrl,
                demageImageList
            },
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 2
            }
        }
    },
    [imageListForDemageActionTypes.get_DamageImageList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [imageListForDemageActionTypes.get_DamageImageList_waiting]: (state, action) => {
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 1
            }
        }
    },
    [imageListForDemageActionTypes.get_DamageImageList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getDamageImageList: {
                ...initialState.getDamageImageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [imageListForDemageActionTypes.upload_ImageAtDemage_success]: (state, action) => {
        const { payload: { demageImageList } } = action
        return {
            ...state,
            data: {
                demageImageList: [...state.data.demageImageList, ...demageImageList.map(item => { return { url: item } })]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 2
            }
        }
    },
    [imageListForDemageActionTypes.upload_ImageAtDemage_partSuccess]: (state, action) => {
        const { payload: { demageImageList, failedMsg } } = action
        return {
            ...state,
            data: {
                demageImageList: [...state.data.demageImageList, ...demageImageList]
            },
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [imageListForDemageActionTypes.upload_ImageAtDemage_waiting]: (state, action) => {
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 1
            }
        }
    },
    [imageListForDemageActionTypes.upload_ImageAtDemage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [imageListForDemageActionTypes.upload_ImageAtDemage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadDamageImage: {
                ...initialState.uploadDamageImage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [imageListForDemageActionTypes.upload_videoForDamage_success]: (state, action) => {
        const { payload: { videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                videoUrl
            },
            uploadImageForDamage: {
                ...initialState.uploadImageForDamage,
                isResultStatus: 2
            }
        }
    },
    [imageListForDemageActionTypes.upload_videoForDamage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadImageForDamage: {
                ...initialState.uploadImageForDamage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [imageListForDemageActionTypes.upload_videoForDamage_waiting]: (state, action) => {
        return {
            ...state,
            uploadImageForDamage: {
                ...initialState.uploadImageForDamage,
                isResultStatus: 1
            }
        }
    },
    [imageListForDemageActionTypes.upload_videoForDamage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadImageForDamage: {
                ...initialState.uploadImageForDamage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [imageListForDemageActionTypes.set_indexForUploadImageForDamage]: (state, action) => {
        const { payload: { index } } = action
        return {
            ...state,
            data: {
                ...state.data,
                index
            }
        }
    }

}, initialState)
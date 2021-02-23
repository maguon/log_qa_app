import { handleActions } from 'redux-actions'
import * as applyDamageUploadImageActionTypes from './ApplyDamageUploadImageActionTypes'

const initialState = {
    data: {
        imageList: [],
        videoUrl: null,
        recordId: 0,
        index: 0
    },
    uploadImageForApplyDamage: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    // delImage: {
    //     errorMsg: '',
    //     failedMsg: '',
    //     isResultStatus: 0
    // },
    getImageForCreateCar: {
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    },
    uploadVideoForApplyDamage:{
        errorMsg: '',
        failedMsg: '',
        isResultStatus: 0
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败),5(服务器未处理错误)]
export default handleActions({
    [applyDamageUploadImageActionTypes.upload_DamageImage_success]: (state, action) => {
        const { payload: { imageList, recordId } } = action

        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadImageForApplyDamage: {
                ...initialState.uploadImageForApplyDamage,
                isResultStatus: 2
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_partSuccess]: (state, action) => {
        const { payload: { imageList, failedMsg, recordId } } = action
        return {
            ...state,
            data: {
                imageList: [...state.data.imageList, ...imageList],
                recordId
            },
            uploadImageForApplyDamage: {
                ...initialState.uploadImageForApplyDamage,
                isResultStatus: 5,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_waiting]: (state, action) => {
        return {
            ...state,
            uploadImageForApplyDamage: {
                ...initialState.uploadImageForApplyDamage,
                isResultStatus: 1
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadImageForApplyDamage: {
                ...initialState.uploadImageForApplyDamage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_DamageImage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadImageForApplyDamage: {
                ...initialState.uploadImageForApplyDamage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [applyDamageUploadImageActionTypes.clean_upload_DamageImage]: (state, action) => {
        return {
            ...initialState
        }
    },




    // [applyDamageUploadImageActionTypes.del_imageForApplyDamage_success]: (state, action) => {
    //     const { payload: { imageurl } } = action
    //     return {
    //         ...state,
    //         data: {
    //             ...state.data,
    //             imageList: state.data.imageList.filter(item => item != imageurl)
    //         },
    //         delImage: {
    //             ...initialState.delImage,
    //             isResultStatus: 2
    //         }
    //     }
    // },
    // [applyDamageUploadImageActionTypes.del_imageForApplyDamage_failed]: (state, action) => {
    //     const { payload: { failedMsg } } = action
    //     return {
    //         ...state,
    //         delImage: {
    //             ...initialState.delImage,
    //             isResultStatus: 4,
    //             failedMsg
    //         }
    //     }
    // },
    // [applyDamageUploadImageActionTypes.del_imageForApplyDamage_waiting]: (state, action) => {
    //     return {
    //         ...state,
    //         delImage: {
    //             ...initialState.delImage,
    //             isResultStatus: 1
    //         }
    //     }
    // },
    // [applyDamageUploadImageActionTypes.del_imageForApplyDamage_error]: (state, action) => {
    //     const { payload: { errorMsg } } = action
    //     return {
    //         ...state,
    //         delImage: {
    //             ...initialState.delImage,
    //             isResultStatus: 3,
    //             errorMsg
    //         }
    //     }
    // },

    [applyDamageUploadImageActionTypes.get_imageForApplyDamage_success]: (state, action) => {
        const { payload: { imageList, recordId, videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                imageList,
                recordId,
                videoUrl
            },
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 2
            }
        }
    },
    [applyDamageUploadImageActionTypes.get_imageForApplyDamage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.get_imageForApplyDamage_waiting]: (state, action) => {
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 1
            }
        }
    },
    [applyDamageUploadImageActionTypes.get_imageForApplyDamage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getImageForCreateCar: {
                ...initialState.getImageForCreateCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [applyDamageUploadImageActionTypes.upload_videoForApplyDamage_success]: (state, action) => {
        const { payload: { videoUrl } } = action
        return {
            ...state,
            data: {
                ...state.data,
                videoUrl
            },
            uploadVideoForApplyDamage: {
                ...initialState.uploadVideoForApplyDamage,
                isResultStatus: 2
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_videoForApplyDamage_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            uploadVideoForApplyDamage: {
                ...initialState.uploadVideoForApplyDamage,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_videoForApplyDamage_waiting]: (state, action) => {
        return {
            ...state,
            uploadVideoForApplyDamage: {
                ...initialState.uploadVideoForApplyDamage,
                isResultStatus: 1
            }
        }
    },
    [applyDamageUploadImageActionTypes.upload_videoForApplyDamage_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            uploadVideoForApplyDamage: {
                ...initialState.uploadVideoForApplyDamage,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [applyDamageUploadImageActionTypes.set_indexForUploadImageForApplyDamage]: (state, action) => {
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



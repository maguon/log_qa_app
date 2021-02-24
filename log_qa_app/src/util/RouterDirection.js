import { Actions } from 'react-native-router-flux'

export const searchCar = (parent) => {
    if (parent === 'settingBlock') return Actions.searchCarAtSettingBlock
    if (parent === 'homeBlock') return Actions.searchCarAtHomeBlock
}
export const singlePhotoView = (parent) => {
    if (parent === 'settingBlock') return Actions.singlePhotoViewAtSettingBlock
    if (parent === 'homeBlock') return Actions.singlePhotoViewAtHomeBlock
}




export const carInfo = (parent) => {
    if (parent === 'settingBlock') return Actions.carInfoAtSettingBlock
    if (parent === 'homeBlock') return Actions.carInfoAtHomeBlock
}

export const selectDriver = (parent) => {
    if (parent === 'applyDamageAtSettingBlock') return Actions.selectDriverAtSettingBlock
    if (parent === 'applyDamageAtHomeBlock') return Actions.selectDriverAtHomeBlock
}


export const applyDamage = (parent) => {
    if (parent === 'carInfoAtSettingBlock') return Actions.applyDamageAtSettingBlock
    if (parent === 'carInfoAtHomeBlock') return Actions.applyDamageAtHomeBlock
}

export const applyDamageUploadImage = (parent) => {
    if (parent === 'applyDamageAtSettingBlock') return Actions.applyDamageUploadImageAtSettingBlock
    if (parent === 'applyDamageAtHomeBlock') return Actions.applyDamageUploadImageAtHomeBlock
}


export const pictureRecording = (routeName) => {
    if (routeName === 'applyDamageUploadImageAtSettingBlock') return param => Actions.pictureRecordingAtSettingBlock(param)
    if (routeName === 'applyDamageUploadImageAtHomeBlock') return param => Actions.pictureRecordingAtHomeBlock(param)
}


export const showImageForApplyDamage = (routeName) => {
    if (routeName === 'applyDamageUploadImageAtSettingBlock') return Actions.showImageForApplyDamageAtSettingBlock
    if (routeName === 'applyDamageUploadImageAtHomeBlock') return Actions.showImageForApplyDamageAtHomeBlock
}

export const showVideoForApplyDamage = (routeName) => {
    if (routeName === 'applyDamageUploadImageAtSettingBlock') return Actions.showVideoForApplyDamageAtSettingBlock
    if (routeName === 'applyDamageUploadImageAtHomeBlock') return Actions.showVideoForApplyDamageAtHomeBlock
}


export const carModelList = (routeName) => {
    if (routeName === 'applyDamageAtSettingBlock') return Actions.carModelListAtSettingBlock
    if (routeName === 'applyDamageAtHomeBlock') return Actions.carModelListAtHomeBlock
}